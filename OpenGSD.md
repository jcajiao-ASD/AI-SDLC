# Open GSD y GSD Core para un SDLC basado en GitHub Copilot

> **Fecha de corte:** 20 de julio de 2026.  
> **Conclusión de evidencia:** no se localizaron estudios independientes, controlados y reproducibles que demuestren que GSD Core mejora la calidad, productividad o tiempo de entrega. La documentación oficial describe mecanismos plausibles; las métricas públicas muestran adopción; los testimonios son experiencias individuales. Ninguna de esas señales prueba efectividad causal.

## Resumen ejecutivo

**Open GSD** es una suite de herramientas para desarrollo agentivo. Su sitio presenta, entre otros componentes, [GSD Core](https://opengsd.net/), [GSD Pi](https://docs.opengsd.net/pi/introduction) y [GSD Browser](https://docs.opengsd.net/browser/introduction), además de productos desktop/cloud anunciados. **GSD Core** es el componente pertinente cuando una organización ya eligió GitHub Copilot: no sustituye a Copilot ni aporta otro modelo; instala sobre el runtime existente una capa de instrucciones, skills, agentes, hooks y artefactos de planificación.

El flujo principal es **Discuss → Plan → Execute → Verify → Ship**. Su propuesta diferencial no es solo “escribir una especificación”, sino gobernar el ciclo completo: dividir un objetivo en fases, ejecutar planes mediante subagentes con contexto separado, persistir decisiones en `.planning/`, comprobar resultados y preparar el pull request.

Para una organización con Copilot, GSD Core es la opción más ambiciosa de las dos analizadas en este estudio para cubrir el SDLC completo. También es la de mayor ceremonia, consumo potencial, superficie de automatización y riesgo operativo. Conviene pilotarla con permisos conservadores, versiones fijadas y revisión humana obligatoria.

## 1. Qué es y qué no es

### Terminología

| Término | Significado |
|---|---|
| **Open GSD** | Suite/proyecto paraguas. El sitio oficial enumera Core, Pi, Browser y productos futuros. |
| **GSD Core** | Framework de meta-prompting, ingeniería de contexto y desarrollo guiado por especificaciones que se instala sobre un agente existente. |
| **GSD Pi** | Agente local autónomo propio de la suite; no es necesario para usar GSD Core con Copilot. |
| **Fase** | Incremento acotado dentro de un milestone. Repite Discuss, Plan, Execute, Verify y Ship. |
| **Plan** | Unidad de ejecución atómica, con tareas, dependencias, archivos a leer y criterios de aceptación. |
| **Artefactos de planificación** | Markdown/JSON persistente bajo `.planning/`. |
| **Subagente** | Ejecución especializada con contexto aislado del hilo principal, si el runtime la soporta. |

La [introducción oficial](https://docs.opengsd.net/core/introduction) define GSD Core como un framework que “se sienta encima” del runtime de codificación. Por tanto:

- **no entrena ni modifica el modelo de Copilot**;
- **no convierte una especificación en garantía de código correcto**;
- **no reemplaza CI, revisión de seguridad, observabilidad ni aprobación humana**;
- **sí cambia de forma sustancial lo que Copilot ve y las acciones que se le pide realizar**.

### Estado de versión verificado

Al corte:

- [`@opengsd/gsd-core` 1.7.0](https://github.com/open-gsd/gsd-core/releases/tag/v1.7.0) fue publicado el **15-07-2026** como release estable (`prerelease: false`).
- El [registro npm](https://registry.npmjs.org/@opengsd%2Fgsd-core) marcaba `latest: 1.7.0` y `next: 1.7.0-rc.6`.
- El [`package.json` de 1.7.0](https://github.com/open-gsd/gsd-core/blob/v1.7.0/package.json) exige **Node.js >=22** y **npm >=10**.

Esto corrige un hallazgo preliminar: 1.7.0 no era solo una candidata; ya era la versión estable. Existe, además, una inconsistencia documental: una guía versionada aún menciona Node 18+, pero el manifiesto publicado y la [documentación de instalación](https://docs.opengsd.net/core/installation) exigen Node 22. Debe prevalecer el requisito del paquete.

## 2. Problema que intenta resolver

GSD Core organiza su diseño alrededor de tres fallos frecuentes del trabajo agentivo:

1. **Degradación del contexto:** una conversación larga acumula ruido, decisiones obsoletas y resultados intermedios.
2. **Pérdida de memoria entre sesiones:** las decisiones quedan en chats efímeros.
3. **Finalización sin evidencia:** el agente declara terminada una tarea sin contrastarla de forma suficiente con requisitos y pruebas.

Su respuesta es:

- sacar investigación, planificación, implementación y verificación a agentes especializados;
- entregar a cada ejecución solo los artefactos pertinentes;
- persistir estado y decisiones en archivos versionables;
- encadenar comprobaciones antes de avanzar.

Es una arquitectura razonable, pero la afirmación comercial de que así “resuelve” el deterioro de contexto debe leerse como **tesis de diseño**, no como resultado experimental probado para GSD Core.

## 3. Flujo, arquitectura y artefactos

### Flujo por fase

Según la [guía del ciclo](https://docs.opengsd.net/core/concepts/workflow):

1. **Discuss** — `/gsd-discuss-phase N` pregunta por decisiones ambiguas y escribe `CONTEXT.md`.
2. **Plan** — `/gsd-plan-phase N` investiga, descompone, ordena dependencias y revisa planes.
3. **Execute** — `/gsd-execute-phase N` agrupa planes en olas, delega y produce código, commits y resúmenes.
4. **Verify** — `/gsd-verify-work N` combina verificación automática y UAT humana.
5. **Ship** — `/gsd-ship N` construye el cuerpo del PR, archiva estado y avanza la fase.

GSD Core también incorpora `/gsd-spec-phase N` antes de Discuss cuando se necesita aclarar formalmente el **qué**, incluidos bordes y prohibiciones; no es obligatorio en el bucle mínimo.

### Estructura persistente

La [referencia de artefactos](https://docs.opengsd.net/core/concepts/planning-artifacts) describe:

```text
.planning/
├── PROJECT.md
├── REQUIREMENTS.md
├── ROADMAP.md
├── STATE.md
├── config.json
├── continue-here.md
├── codebase/
├── research/
└── phases/
    └── 01-nombre/
        ├── 01-CONTEXT.md
        ├── 01-DISCUSSION-LOG.md
        ├── 01-RESEARCH.md
        ├── 01-01-PLAN.md
        ├── 01-01-SUMMARY.md
        ├── 01-VERIFICATION.md
        └── 01-UAT.md
```

Artefactos clave:

- `PROJECT.md`: visión, restricciones y contexto de negocio.
- `REQUIREMENTS.md`: requisitos identificados y clasificados.
- `ROADMAP.md`: milestones/fases y trazabilidad.
- `STATE.md`: posición, decisiones, bloqueos y recuperación.
- `CONTEXT.md`: decisiones humanas por fase.
- `PLAN.md`: tareas ejecutables y criterios de aceptación.
- `SUMMARY.md`: implementación y desviaciones declaradas por el ejecutor.
- `VERIFICATION.md`: contraste del código con objetivos/requisitos.
- `UAT.md`: aceptación humana.

### Greenfield y brownfield

- **Greenfield:** `/gsd-new-project`.
- **Brownfield:** `/gsd-onboard` y `/gsd-map-codebase`, que generan mapas de stack, arquitectura, estructura, convenciones, pruebas, integraciones y riesgos. La [guía brownfield](https://github.com/open-gsd/gsd-core/blob/v1.7.0/docs/tutorials/onboarding-an-existing-codebase.md) recomienda describir lo que se añadirá, no reespecificar todo el sistema.

### Git, ramas y PR

GSD Core puede:

- crear commits atómicos durante ejecución;
- usar worktrees y estrategias de rama configurables;
- generar el contenido del PR con `/gsd-ship`;
- archivar la fase y actualizar el estado.

Eso integra más del ciclo que una capa de especificaciones, pero también concede al agente mayor autoridad sobre el repositorio. La configuración oficial incluye confirmaciones, seguridad para acciones destructivas y servicios externos; deben conservarse durante el piloto.

## 4. Cómo influye realmente sobre GitHub Copilot

### Superficies instaladas

La [arquitectura oficial](https://github.com/open-gsd/gsd-core/blob/v1.7.0/docs/ARCHITECTURE.md) indica que una instalación local para Copilot escribe:

- `.github/skills/gsd-*/SKILL.md`;
- agentes `.agent.md`;
- `.github/copilot-instructions.md`;
- un bloque administrado en `AGENTS.md` en la raíz;
- `.github/hooks/gsd-session.json`.

GitHub confirma que Copilot CLI consume [skills](https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/add-skills), [instrucciones](https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/add-custom-instructions), agentes y hooks. Por ello, la integración no es solo nominal: los archivos generados entran en el mecanismo nativo de personalización de Copilot.

### Instrucciones y skills

Las instrucciones describen el proceso, restricciones y artefactos que el agente debe leer. Las skills encapsulan comandos GSD y cargan instrucciones especializadas cuando se invocan. Su influencia es **probabilística**: orientan al modelo, pero este puede interpretar mal, omitir o ejecutar de forma incompleta una instrucción.

### Hooks

El matiz más importante para Copilot es la cobertura real:

- GSD Core instala un hook `sessionStart` **advisory** que informa si existe un workflow `.planning/`.
- La documentación de GSD enumera guards más amplios para otros runtimes, pero **Copilot no recibe automáticamente toda la cobertura determinista de Claude Code**.
- En consecuencia, controles como monitor de contexto, guard de lectura o escaneo de inyección no deben suponerse activos en Copilot solo porque existan en el repositorio de GSD.

### Subagentes y contexto

Copilot CLI soporta [subagentes en contextos separados](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/use-copilot-cli). GSD instala roles y workflows que intentan usar esa capacidad para investigación, planificación, ejecución y verificación.

La frase oficial “hasta 200K tokens” describe la ventana solicitada/disponible en determinados modelos, no una garantía universal. El tamaño efectivo, profundidad de delegación, concurrencia y herramientas dependen del modelo, versión y políticas de Copilot.

### Persistencia

El mayor mecanismo de influencia no es el prompt inicial, sino la combinación:

```text
instrucciones GSD
        +
skills/roles
        +
artefactos .planning/
        +
estado Git
```

Una sesión nueva puede reconstruir el trabajo desde archivos. Esto reduce dependencia del chat, aunque introduce otro riesgo: **si los artefactos quedan obsoletos o contienen una decisión incorrecta, esa información errónea se vuelve persistente**.

## 5. Ventajas potenciales

> Esta sección es valoración analítica basada en mecanismos, no evidencia causal.

1. **Cobertura amplia del SDLC:** requisitos, arquitectura, planificación, construcción, pruebas, revisión y PR.
2. **Trazabilidad:** requisitos → fase → plan → resumen → verificación.
3. **Memoria versionable:** decisiones legibles y revisables fuera del chat.
4. **Descomposición explícita:** reduce tareas monolíticas y facilita detener/replanificar.
5. **Separación de contextos:** útil para trabajos grandes y para no llenar el hilo principal.
6. **Brownfield estructurado:** mapea convenciones y riesgos antes de cambiar código.
7. **Paralelismo controlable:** planes independientes pueden ejecutarse en olas.
8. **Verificación y UAT visibles:** obliga a producir evidencia, aunque no garantiza su suficiencia.
9. **Integración Git/PR:** aproxima la ejecución agentiva a un flujo de entrega real.
10. **Portabilidad:** los artefactos Markdown/JSON permanecen aunque cambie el modelo.

## 6. Límites, riesgos y costos

### Ceremonia y latencia

Para cambios triviales, crear proyecto, requisitos, roadmap, discusión, investigación, planes, resúmenes, verificación y UAT puede costar más que implementar directamente. La propia experiencia de usuarios del antecesor GSD reporta discusiones de 15 minutos o más por fase.

### Consumo de tokens

Investigadores paralelos, planificador, plan-checker, ejecutores y verificador multiplican llamadas. La configuración permite limitar concurrencia y seleccionar perfiles, pero no elimina el costo. El costo debe medirse por cambio, no inferirse del número de agentes.

### Calidad de artefactos

Una especificación larga no es necesariamente buena. Posibles fallos:

- requisitos inventados;
- investigación web incorrecta;
- planes que omiten restricciones implícitas;
- `SUMMARY.md` que sobredeclara lo implementado;
- verificador que comparte sesgos con el ejecutor;
- decisiones persistentes que ya no reflejan el código.

### Automatización de Git

Los commits automáticos, worktrees y PRs pueden chocar con políticas internas, ramas protegidas o convenciones de firma. El piloto debe definir qué puede escribir Copilot y qué requiere aprobación.

### Seguridad

- `npx` ejecuta código de un paquete externo.
- Skills y hooks pueden ejecutar comandos.
- Investigación puede introducir prompt injection o dependencias maliciosas.
- GitHub advierte que preaprobar `shell`/`bash` en una skill elimina confirmaciones.

Por eso deben fijarse versiones, verificar repositorio/integridad, revisar los archivos generados y evitar `/allow-all` o modos autónomos en la adopción inicial.

### Madurez y cambio rápido

El repositorio de GSD Core fue creado en mayo de 2026 y alcanzó 1.7.0 en julio. La velocidad de cambio aporta capacidades, pero eleva riesgo de drift de documentación, incompatibilidades y actualizaciones con gran superficie.

### Lock-in de proceso

Los archivos son portables, pero el significado operativo de comandos, estados y plantillas pertenece a GSD. Abandonar el framework deja documentación útil, aunque puede requerir depuración y simplificación.

## 7. Aporte potencial por fase del SDLC

| Fase del SDLC | Aporte de GSD Core | Límite |
|---|---|---|
| Descubrimiento | Entrevista, exploración, captura de restricciones | No sustituye discovery con clientes ni análisis de negocio |
| Requisitos | IDs, alcance v1/v2/fuera de alcance, `SPEC.md` opcional | El agente puede formalizar una premisa equivocada |
| Arquitectura | Investigación, decisiones y mapas brownfield | No prueba viabilidad operativa por sí sola |
| Planificación | Planes atómicos, dependencias, olas, revisión del plan | Más planes implican más tokens y coordinación |
| Construcción | Ejecutores aislados, commits por tarea | Paralelismo puede crear conflictos o divergencia |
| Pruebas | Test gate, verificación, generación de pruebas, UAT | La calidad depende del oráculo y cobertura |
| Seguridad | Comandos/gates específicos y guards según runtime | La cobertura en Copilot es menor que en Claude; requiere herramientas externas |
| Revisión | Resúmenes, code review y revisión cruzada opcional | Revisores basados en LLM no son independientes en sentido estadístico |
| Release | PR estructurado, tag/archivo y avance de estado | No opera despliegues empresariales sin integración adicional |
| Operación | Persistencia, debugging, captura de aprendizajes | No reemplaza observabilidad, SRE ni gestión de incidentes |

## 8. Instalación y tutorial reproducible con Copilot CLI

### Precondiciones

```bash
node --version   # debe ser v22 o superior
npm --version    # debe ser 10 o superior
copilot --version
git status --short
```

Trabaje en una rama desechable y con el árbol limpio:

```bash
git switch -c pilot/gsd-core-1.7.0
npm view @opengsd/gsd-core@1.7.0 version engines repository dist.integrity
```

Revise el [release oficial](https://github.com/open-gsd/gsd-core/releases/tag/v1.7.0), el repositorio y los permisos antes de ejecutar el instalador.

### Instalación local fijada

```bash
npx @opengsd/gsd-core@1.7.0 --copilot --local
```

No use `@latest` en un piloto reproducible. Después:

```bash
git status --short
git diff -- .github AGENTS.md
```

Revise, en particular:

- `.github/skills/`;
- `.github/agents/` o agentes generados equivalentes;
- `.github/copilot-instructions.md`;
- `.github/hooks/gsd-session.json`;
- el bloque GSD en `AGENTS.md`;
- cualquier script, comando permitido o referencia externa.

No confirme cambios que otorguen ejecución amplia sin entenderlos.

### Verificación en Copilot CLI

```bash
copilot
```

Dentro de Copilot:

```text
/env
/instructions
/skills list
```

Compruebe que aparecen las instrucciones y skills GSD. No active `/allow-all`; apruebe cada comando modificador durante el piloto.

### Primer cambio brownfield

1. **Mapear y orientar:**

   ```text
   /gsd-onboard
   ```

   Siga el handoff sugerido, normalmente `/gsd-map-codebase`, y revise `.planning/codebase/`.

2. **Inicializar el objetivo de cambio:**

   ```text
   /gsd-new-project
   ```

   Describa solo el incremento que desea construir. Revise `PROJECT.md`, `REQUIREMENTS.md` y `ROADMAP.md`.

3. **Aclarar especificación cuando el cambio sea sensible:**

   ```text
   /gsd-spec-phase 1
   ```

4. **Fijar decisiones:**

   ```text
   /gsd-discuss-phase 1
   ```

5. **Planificar y revisar antes de código:**

   ```text
   /gsd-plan-phase 1
   ```

   Lea todos los `PLAN.md`; no apruebe rutas, paquetes o criterios no verificados.

6. **Ejecutar:**

   ```text
   /gsd-execute-phase 1
   ```

   Vigile permisos, commits y resultados de pruebas.

7. **Verificar y hacer UAT:**

   ```text
   /gsd-verify-work 1
   ```

   Contraste `VERIFICATION.md` con CI real y realice pruebas manuales relevantes.

8. **Revisar diff en Copilot y con humanos:**

   ```text
   /diff
   /review
   ```

9. **Preparar PR:**

   ```text
   /gsd-ship 1 --draft
   ```

   Revise el PR, la rama objetivo y toda acción remota antes de aprobar.

### Configuración conservadora sugerida

Durante el piloto:

- `mode: interactive`;
- confirmaciones y safety gates activas;
- `parallelization.max_concurrent_agents` bajo;
- sin `auto_advance` ni modo autónomo;
- `workflow.test_command` y `build_command` explícitos;
- PR draft, nunca merge automático;
- revisión humana de requisitos, planes, dependencias y evidencia.

## 9. Métricas y evidencia

### Evidencia directa sobre GSD Core

**No encontrada.** No se localizaron:

- ensayos A/B;
- comparaciones controladas contra Copilot sin GSD;
- mediciones independientes de lead time, defectos escapados o retrabajo;
- benchmarks reproducibles que aíslen el efecto del framework.

### Evidencia interna cercana, pero no suficiente

Un documento de **GSD Pi**, no de GSD Core, publica una [auditoría interna de consumo de tokens](https://github.com/open-gsd/gsd-pi/blob/main/docs/token-consumption-savings-evidence.md). Reporta muestras de superficies de prompt; por ejemplo, una muestra `gsd-auto` promedió 20.775 tokens de entrada estimados y `gsd-run` 73.367. Limitaciones:

- es evidencia de los mantenedores;
- se refiere a otro producto de la suite;
- no presenta diseño controlado ni dataset externo;
- mide tamaño de prompt, no calidad, productividad o defectos;
- varios registros tienen pocas filas.

Su fuerza para decidir adopción de GSD Core es **muy débil**.

### Señales de adopción, no de efectividad

Consultas a APIs oficiales al 20-07-2026:

- repositorio `open-gsd/gsd-core`: aproximadamente **6.919 stars** y **465 forks**;
- npm, periodo 21-06 a 20-07-2026: **36.303 descargas**.

Las stars, forks y descargas pueden incluir curiosidad, CI, reinstalaciones o uso no productivo. No indican éxito de proyectos.

### Evidencia indirecta — no atribuible a GSD Core

| Estudio | Método y resultado | Qué sugiere | Por qué no prueba GSD |
|---|---|---|---|
| [FeatureBench, ICLR 2026](https://arxiv.org/abs/2602.10975) | 200 tareas de features, 3.825 entornos, 24 repositorios; Claude 4.5 Opus resolvió 11% en la versión inicial | Construir features completas sigue siendo difícil; justifica descomposición y controles | No evaluó GSD Core ni Copilot+GSD |
| [FeatBench](https://arxiv.org/abs/2509.22237) | 157 tareas de 27 repositorios, requisitos solo en lenguaje natural; máximo 29,94%; detecta scope creep y regresiones | La intención ambigua y la falta de regresión son riesgos reales | No compara workflows de especificación |
| [CodePlan, FSE 2024](https://www.microsoft.com/en-us/research/publication/codeplan-repository-level-coding-using-llms-and-planning-2/) | Cambios en 2–97 archivos; 5/7 repositorios pasaron validez con planificación, 0/7 en baselines sin ella | La planificación incremental puede ayudar en cambios multiarchivo | Sistema, tareas, modelos y análisis distintos |
| [UTBoost, ACL 2025](https://aclanthology.org/2025.acl-long.189/) | Encontró 345 parches erróneos que pruebas originales clasificaban como válidos | “Tests verdes” pueden ser un oráculo insuficiente | No mide GSD; respalda pruebas adicionales y UAT |
| [METR 2025 y actualización 2026](https://metr.org/blog/2026-02-24-uplift-update/) | RCT inicial: 16 desarrolladores, 246 tareas, 19% más lentos con IA temprana; estudio posterior con 57 desarrolladores/800+ tareas quedó sesgado por selección y no permite estimación fiable | Productividad debe medirse localmente; percepción y efecto real pueden divergir | Herramientas/modelos y población distintos; la actualización dice que el efecto actual probablemente mejoró, sin cuantificarlo bien |

## 10. Testimonios verificados

### Usuarios independientes o externos

- **Sydney Cole, Atomic Object:** en [“Getting Shit Done with GSD”](https://spin.atomicobject.com/get-shit-done-gsd/) dice que fases que tomaban varios días bajaron a uno y que la discusión previa fue su parte favorita. También reporta degradación visible hacia los planes 03/04, decisiones perdidas y fallos que el verificador no detectó. **Sesgo/límite:** experiencia auto-reportada, sin control; se refiere al GSD anterior cuyo repositorio fue abandonado, no demuestra resultados de Open GSD Core 1.7.0.
- **Kai Hendry:** en su [comparación de frameworks SDD](https://dabase.com/blog/2026/sdd-framework-comparison/) considera tranquilizador el énfasis de GSD en limpiar contexto, pero lo percibe burocrático, confuso en numeración, lento y intensivo en tokens. **Sesgo/límite:** prueba personal de un proyecto; también corresponde al linaje `get-shit-done`, no a una evaluación controlada de GSD Core actual.

No se encontró una fuente primaria verificable que permita presentar testimonios independientes sobre **GSD Core 1.7.0 con Copilot CLI**. Las afirmaciones de mantenedores y documentación oficial se consideran descripción del producto, no evidencia independiente.

## 11. Recomendación de adopción

### Recomendación

**Adoptar solo como piloto controlado, no todavía como estándar obligatorio para todos los cambios.**

GSD Core merece evaluación cuando:

- el trabajo abarca varias fases o archivos;
- la organización necesita persistencia entre sesiones;
- Copilot debe planificar, construir, verificar y preparar PRs;
- hay disciplina para revisar artefactos;
- el costo de una interpretación errónea es mayor que el costo de la ceremonia.

Evitarlo o usar un flujo reducido cuando:

- el cambio es trivial;
- la base de código carece de pruebas;
- el equipo no revisará planes/artefactos;
- no se pueden controlar permisos de shell/Git;
- el presupuesto de tokens o latencia es estricto.

### Métricas mínimas del piloto

Comparar con un baseline de cambios equivalentes realizados con Copilot sin GSD:

- tiempo humano activo y tiempo calendario;
- tokens/créditos y costo;
- porcentaje de planes rechazados antes de ejecutar;
- retrabajo después de implementación;
- defectos encontrados antes y después del merge;
- cobertura de requisitos y pruebas;
- cantidad de intervenciones humanas;
- conflictos de merge y fallos de CI;
- utilidad/actualidad de `.planning/` después de dos semanas.

La decisión debe depender de esos datos internos, no de stars, demos o testimonios.

## Bibliografía

### Fuentes oficiales de Open GSD

- [Open GSD — suite](https://opengsd.net/)
- [GSD Core — introducción](https://docs.opengsd.net/core/introduction)
- [Instalación](https://docs.opengsd.net/core/installation)
- [Quickstart](https://docs.opengsd.net/core/quickstart)
- [Workflow](https://docs.opengsd.net/core/concepts/workflow)
- [Artefactos de planificación](https://docs.opengsd.net/core/concepts/planning-artifacts)
- [Arquitectura 1.7.0](https://github.com/open-gsd/gsd-core/blob/v1.7.0/docs/ARCHITECTURE.md)
- [Comandos 1.7.0](https://github.com/open-gsd/gsd-core/blob/v1.7.0/docs/COMMANDS.md)
- [Configuración 1.7.0](https://github.com/open-gsd/gsd-core/blob/v1.7.0/docs/CONFIGURATION.md)
- [Onboarding brownfield](https://github.com/open-gsd/gsd-core/blob/v1.7.0/docs/tutorials/onboarding-an-existing-codebase.md)
- [Release 1.7.0](https://github.com/open-gsd/gsd-core/releases/tag/v1.7.0)
- [Paquete npm](https://www.npmjs.com/package/@opengsd/gsd-core)
- [Auditoría interna de tokens de GSD Pi](https://github.com/open-gsd/gsd-pi/blob/main/docs/token-consumption-savings-evidence.md)

### GitHub Copilot

- [Uso de GitHub Copilot CLI](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/use-copilot-cli)
- [Skills en Copilot CLI](https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/add-skills)
- [Instrucciones en Copilot CLI](https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/add-custom-instructions)
- [Matriz de personalización](https://docs.github.com/en/copilot/reference/customization-cheat-sheet)

### Evidencia y testimonios

- [FeatureBench](https://arxiv.org/abs/2602.10975)
- [FeatBench](https://arxiv.org/abs/2509.22237)
- [CodePlan](https://www.microsoft.com/en-us/research/publication/codeplan-repository-level-coding-using-llms-and-planning-2/)
- [UTBoost](https://aclanthology.org/2025.acl-long.189/)
- [METR, estudio 2025](https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/)
- [METR, actualización 2026](https://metr.org/blog/2026-02-24-uplift-update/)
- [Sydney Cole, Atomic Object](https://spin.atomicobject.com/get-shit-done-gsd/)
- [Kai Hendry](https://dabase.com/blog/2026/sdd-framework-comparison/)
