# Superpowers para desarrollo agéntico de software

> **Fecha de corte:** 21 de julio de 2026.  
> **Conclusión de evidencia:** Superpowers ofrece una metodología coherente y
> fuertemente prescriptiva para diseño, planificación, TDD, subagentes y revisión.
> Sus mecanismos son plausibles y varios se apoyan indirectamente en literatura
> académica e industrial, pero no se encontraron benchmarks independientes,
> controlados y reproducibles que demuestren que el framework mejora productividad,
> costo o calidad. Sus cifras de velocidad y tokens son evaluaciones internas y no
> deben generalizarse.

## Resumen ejecutivo

[Superpowers](https://github.com/obra/superpowers), de Jesse Vincent
([`obra`](https://github.com/obra)) y asociado a
[Prime Radiant](https://primeradiant.com/), se define oficialmente como un
**“agentic skills framework & software development methodology”**. No es una sola
skill, un modelo ni un agente autónomo: es una biblioteca de skills componibles,
un bootstrap que obliga al agente a buscarlas antes de actuar y adaptadores para
traducir acciones abstractas a las herramientas de cada harness.

Su flujo principal es:

```text
brainstorming
→ using-git-worktrees
→ writing-plans
→ subagent-driven-development | executing-plans
→ test-driven-development
→ requesting-code-review
→ finishing-a-development-branch
```

La propuesta diferencial no es conservar una especificación completa del producto,
sino imponer **disciplina operacional**: diseño aprobado antes de código, tareas de
2–5 minutos, RED-GREEN-REFACTOR, diagnóstico de causa raíz, implementador fresco
por tarea, revisión por tarea y revisión final de rama.

Al corte, la versión estable más reciente era
[`v6.1.1`](https://github.com/obra/superpowers/releases/tag/v6.1.1), publicada el
2 de julio de 2026. El proyecto documentaba soporte para Claude Code, Antigravity,
Codex App, Codex CLI, Cursor, Factory Droid, GitHub Copilot CLI, Kimi Code,
OpenCode y Pi. La integración real varía: algunos harnesses tienen hooks, otros
plugins, marketplaces o descubrimiento nativo de skills. Superpowers considera
que sin activación automática al inicio de sesión —sin opt-in humano repetido— no
existe soporte completo.

Frente a las alternativas estudiadas:

- **OpenSpec** es más ligero y conserva cambios/especificaciones de manera más
  estructurada;
- **GSD Core** tiene el sistema de estado persistente y ciclo de proyecto más
  amplio;
- **Superpowers** impone con mayor intensidad el comportamiento del agente durante
  la construcción, las pruebas, la revisión y el cierre Git.

La recomendación es un **piloto controlado**, no una adopción general inmediata.
Debe compararse contra el flujo actual con tareas pareadas y medir lead time,
tokens/costo, retrabajo, defectos escapados, pruebas, hallazgos de revisión,
cumplimiento del plan e intervención humana.

## 1. Qué es, origen y alcance

### Identidad canónica

El proyecto canónico es [`obra/superpowers`](https://github.com/obra/superpowers),
licenciado bajo MIT. El README lo describe como una metodología completa para
agentes de codificación, construida sobre skills componibles e instrucciones
iniciales que hacen que el agente las utilice.

Esto permite distinguirlo de tres conceptos cercanos:

| No es | Qué es en realidad |
|---|---|
| Una skill monolítica | Una biblioteca de skills de proceso, pruebas, depuración, colaboración y meta-trabajo |
| Un LLM o agente nuevo | Una capa de metodología que se instala sobre un coding agent existente |
| Un gestor integral de proyecto | Un workflow de ingeniería con artefactos de diseño/plan y estado operativo limitado |
| Un motor de CI | Instrucciones y adaptadores que ordenan ejecutar pruebas y revisiones; CI sigue siendo externo |
| Garantía determinista | Guidance conductual que el modelo puede incumplir y que debe verificarse |

Prime Radiant presenta comercialmente Superpowers como un
[framework de skills componibles](https://primeradiant.com/superpowers/) que
automatiza brainstorming, planificación, TDD, implementación con subagentes y
code review. Esa descripción ayuda a entender el posicionamiento empresarial,
pero no constituye evidencia independiente de efectividad.

### Origen

La secuencia histórica está documentada por Jesse Vincent:

1. El **5 de octubre de 2025** publicó
   [“How I’m using coding agents in September, 2025”](https://blog.fsck.com/2025/10/05/how-im-using-coding-agents-in-september-2025/).
   Allí describió un proceso manual con worktrees, brainstorming socrático,
   planes detallados, sesiones frescas de implementador, revisión por una sesión
   “arquitecta”, TDD y PR.
2. El **9 de octubre de 2025** anunció
   [“Superpowers”](https://blog.fsck.com/2025/10/09/superpowers/), después de
   extraer y sistematizar ese proceso. El recién publicado sistema de plugins de
   Claude Code le permitió distribuir skills y un hook de inicio de sesión.
3. La metodología dejó de depender exclusivamente de Claude Code y evolucionó
   hacia skills agnósticas al harness, más una capa delgada de integración por
   plataforma.

Por tanto, Superpowers nació de una práctica personal iterada y luego convertida
en framework. Esto aporta trazabilidad de diseño, no validación científica.

### Estado de versión y actividad

Al corte:

- [`v6.0.0`](https://github.com/obra/superpowers/releases/tag/v6.0.0) se publicó
  el 16 de junio de 2026 e introdujo la gran revisión de Subagent-Driven
  Development (SDD), nuevos harnesses y mayor neutralidad entre vendors;
- [`v6.1.0`](https://github.com/obra/superpowers/releases/tag/v6.1.0) se publicó
  el 30 de junio de 2026, redujo el costo del bootstrap, mejoró Codex y retiró
  Gemini CLI;
- [`v6.1.1`](https://github.com/obra/superpowers/releases/tag/v6.1.1) se publicó
  el 2 de julio de 2026 y corrigió el empaquetado/hook de Codex.

La frecuencia de releases, los cambios de integración y las correcciones
posteriores muestran mantenimiento activo, pero también un ecosistema todavía
rápido e inestable.

## 2. Arquitectura: skills, tool mapping y bootstrap

La [guía oficial de portabilidad](https://github.com/obra/superpowers/blob/main/docs/porting-to-a-new-harness.md)
separa tres componentes.

### 2.1 Skills agnósticas al harness

`skills/` es la fuente común. Las skills describen **acciones** —leer, editar,
despachar un subagente, crear un todo, invocar otra skill— y evitan acoplarse a
nombres concretos de herramientas.

Ejemplos:

- `brainstorming`;
- `writing-plans`;
- `test-driven-development`;
- `systematic-debugging`;
- `verification-before-completion`;
- `using-git-worktrees`;
- `subagent-driven-development`;
- `requesting-code-review`;
- `finishing-a-development-branch`;
- `writing-skills`;
- `using-superpowers`.

La composición importa: la skill de inicio selecciona la disciplina aplicable y
las skills especializadas definen cómo ejecutar cada actividad.

### 2.2 Mapping de tools por harness

Una acción abstracta debe traducirse a la superficie real de cada agente. Por
ejemplo, “despachar un subagente” puede ser una herramienta nativa, una API de
plugin o una capacidad ausente. La integración:

- mapea las acciones a tool names reales;
- declara degradaciones cuando no existe subagente o task tracking;
- evita reescribir la skill base para cada vendor.

La portabilidad es, por ello, más profunda que copiar archivos Markdown: hay que
demostrar que la plataforma descubre las skills, ejecuta comandos y puede
inyectar el comportamiento inicial.

### 2.3 Bootstrap automático de `using-superpowers`

`using-superpowers` establece la regla central: revisar e invocar skills
relevantes **antes de cualquier respuesta o acción**, incluso antes de explorar
archivos o formular preguntas.

La guía de portabilidad trata la activación automática como requisito duro:

- debe ocurrir al inicio de cada sesión;
- no puede depender de que la persona pegue un prompt o active un modo;
- puede implementarse mediante hook, plugin, extensión, archivo de contexto
  distribuido por el instalador o un mecanismo nativo equivalente;
- debe verificarse con una sesión limpia y una prueba de aceptación.

La propia documentación resume la razón: sin bootstrap, las skills pueden estar
en disco pero permanecer inertes. En `v6.1.0`, Codex dejó de usar un hook porque
su descubrimiento nativo disparaba las skills de forma fiable; esto ilustra que
el **invariante** es la activación automática, no un tipo único de hook.

### Implicación de seguridad y gobernanza

El bootstrap intenta convertir guidance probabilística en un gate conductual,
pero no es una política de seguridad. Un LLM todavía puede:

- no disparar una skill;
- interpretarla mal;
- omitir pasos por presión de contexto;
- usar herramientas con permisos excesivos.

Los controles obligatorios de CI, branch protection, permisos mínimos y revisión
humana deben permanecer fuera del prompt.

## 3. Cómo se trabaja

### 3.1 Workflow oficial

| Paso | Resultado esperado |
|---|---|
| `brainstorming` | Aclara intención, alternativas y restricciones; presenta el diseño por secciones y obtiene aprobación |
| `using-git-worktrees` | Crea una rama/worktree aislada, prepara dependencias y comprueba una línea base limpia |
| `writing-plans` | Convierte el diseño en tareas de 2–5 minutos con paths, código, pruebas e interfaces |
| `subagent-driven-development` | Despacha un implementador fresco por tarea, revisa cada cambio y conserva el contexto del coordinador |
| `executing-plans` | Alternativa por lotes con checkpoints humanos, útil cuando la ejecución ocurre en otra sesión |
| `test-driven-development` | Impone RED → GREEN → REFACTOR y exige observar el fallo antes de implementar |
| `requesting-code-review` | Revisa contra plan/especificación y calidad; hallazgos críticos bloquean avance |
| `finishing-a-development-branch` | Vuelve a verificar, ofrece merge/PR/conservar/descartar y limpia el worktree |

Las skills de depuración y verificación cruzan el flujo:

- `systematic-debugging` exige causa raíz antes de proponer un fix;
- `verification-before-completion` exige evidencia reciente antes de declarar
  éxito;
- `receiving-code-review` pide evaluar el feedback, no obedecerlo ciegamente;
- `dispatching-parallel-agents` limita paralelismo a problemas independientes.

### 3.2 Hard gates

Superpowers formula sus reglas como workflows obligatorios, no recomendaciones:

1. **Skill check antes de actuar.**
2. **Diseño aprobado antes de implementar.**
3. **Plan suficientemente explícito para un implementador sin contexto.**
4. **Tareas pequeñas:** aproximadamente 2–5 minutos cada una.
5. **Prueba fallando antes del código:** si se escribió implementación primero,
   la skill TDD ordena eliminarla y reiniciar.
6. **Causa raíz antes del fix.**
7. **Review temprano y frecuente.**
8. **Evidencia antes de afirmar completitud.**

Estos gates reducen la libertad local del agente para intentar aumentar
repetibilidad. El costo es más pasos, tokens, latencia y fricción en cambios
triviales.

### 3.3 Artefactos y persistencia

El diseño y el plan se conservan normalmente en:

```text
docs/superpowers/
├── specs/
│   └── YYYY-MM-DD-<tema>-design.md
└── plans/
    └── YYYY-MM-DD-<tema>.md
```

Durante SDD, los handoffs y el ledger viven en:

```text
.superpowers/sdd/
├── task-<n>-brief.md
├── task-<n>-report.md
├── review-package-...
└── progress.md
```

El primer grupo puede versionarse como documentación duradera. El segundo es
scratch state autoignorado. Desde `v6.0.3` se movió fuera de `.git/` porque
algunos agentes bloqueaban escrituras allí.

Esta persistencia es más acotada que `.planning/` de GSD Core:

- conserva diseños, planes y recuperación de la ejecución actual;
- no modela de forma nativa milestones, roadmap, requisitos globales, UAT y
  estado completo del proyecto;
- el ledger ignorado puede desaparecer con `git clean -fdx`, aunque parte de la
  recuperación sea posible desde `git log`.

## 4. Subagent-Driven Development (SDD)

No debe confundirse el **SDD de Superpowers**, “Subagent-Driven Development”, con
el uso industrial de **Spec-Driven Development**. Superpowers combina elementos
spec-first con una técnica de orquestación por subagentes.

### Proceso

La [skill oficial de SDD](https://github.com/obra/superpowers/blob/main/skills/subagent-driven-development/SKILL.md)
define:

1. leer el plan y sus restricciones globales;
2. hacer un preflight para detectar contradicciones;
3. crear un brief por tarea;
4. despachar un **implementador fresco** con contexto mínimo;
5. recibir implementación, pruebas, commit y auto-revisión;
6. generar un paquete de diff;
7. despachar un **reviewer por tarea**;
8. corregir hallazgos críticos/importantes y repetir review;
9. registrar avance en el ledger;
10. al terminar, ejecutar una **revisión amplia de toda la rama**;
11. cerrar la rama mediante la skill correspondiente.

El contexto fresco reduce contaminación entre tareas, pero obliga a construir
handoffs de alta calidad. Un brief incompleto solo desplaza el error al
subagente.

### Cambios de la serie 6

`v6.0.0` rediseñó SDD a partir de evaluaciones internas:

- **preflight** único antes de Task 1;
- un reviewer por tarea que emite dos verdicts: cumplimiento de spec y calidad;
- estado “no verificable desde el diff” para que el coordinador inspeccione;
- handoffs por archivo para briefs, reportes y diffs;
- modelo explícito en cada dispatch;
- implementadores/reviewers que reportan estados y evidencia estructurada;
- ledger durable frente a compactación de contexto;
- una revisión final de rama con el modelo más capaz.

La mejora busca evitar costos observados: diffs pegados permanentemente en el
contexto, reviewers que reconstruyen el historial con Git, selección accidental
del modelo más caro y revisión duplicada. Son decisiones informadas por datos
internos; falta replicación externa.

### Paralelismo

Superpowers incluye `dispatching-parallel-agents`, pero SDD estándar procesa el
plan con gates por tarea. El paralelismo es apropiado cuando:

- los problemas no comparten archivos o estado mutable;
- cada agente tiene un alcance independiente;
- los resultados pueden integrarse sin violar el orden del plan.

No ofrece el modelo persistente de **waves** de GSD Core. El paralelismo depende
además de que el harness exponga subagentes; si no, la capacidad se degrada.

## 5. Compatibilidad e integración

El README documentaba las siguientes plataformas al corte:

| Harness | Integración documentada | Observación |
|---|---|---|
| Claude Code | Plugin/marketplace oficial o marketplace de Superpowers | Integración histórica y de referencia |
| Antigravity | Instalación del plugin desde el repositorio | Ejecuta activación desde el primer mensaje |
| Codex App | Marketplace oficial de plugins de Codex | Superficie de instalación gráfica |
| Codex CLI | Marketplace de plugins | Desde `v6.1.0` confía en disparo nativo de skills y no en SessionStart hook |
| Cursor | Marketplace/plugin | Usa sus superficies de plugin/hook |
| Factory Droid | Consume el plugin compatible mediante su marketplace | No necesariamente requiere port separado |
| GitHub Copilot CLI | Marketplace de plugins de Copilot | La instalación y enforcement dependen de la versión del harness |
| Kimi Code | Marketplace o instalación directa del repositorio | Incluye documentación/manifiesto propio |
| OpenCode | Plugin propio | Inyección mediante plugin en proceso |
| Pi | Paquete y extensión | Registra skills e inyecta bootstrap; subagentes/task list pueden requerir complementos |

**Gemini CLI** ya no figuraba como soportado: las
[notas de `v6.1.0`](https://github.com/obra/superpowers/releases/tag/v6.1.0)
indican que se retiró por EOL el 18 de junio de 2026.

### Compatibilidad no significa equivalencia

El mismo cuerpo de skills puede ejecutarse en varios harnesses, pero cambian:

- descubrimiento e invocación de skills;
- momento y confiabilidad del bootstrap;
- disponibilidad de subagentes;
- task tracking;
- permisos de shell y Git;
- compaction/context lifecycle;
- marketplace, actualización y empaquetado;
- capacidad de bloquear acciones.

Por ello, “soportado” significa que existe una integración documentada, no que
todos los gates tengan idéntico enforcement. La guía de portabilidad exige una
prueba limpia —por ejemplo, que “Let’s make a react todo list” dispare
`brainstorming` antes de código— para aceptar un harness nuevo.

## 6. Métricas, adopción y telemetría

### 6.1 Claims internos de rendimiento

La release [`v6.0.0`](https://github.com/obra/superpowers/releases/tag/v6.0.0)
afirma que, en sus evaluaciones con Claude Code y Codex, resultados de calidad
similar se produjeron:

- **“roughly twice as fast”**;
- con **“almost 50% fewer tokens”**.

La propia nota advierte que las cifras no se sostendrán en todos los harnesses
ni workloads.

El blog de Jesse Vincent del 15 de junio de 2026,
[“Superpowers 6”](https://blog.fsck.com/2026/06/15/Superpowers-6/), presenta
otra formulación comercial:

- **“up to 50% faster”**;
- **“up to 60% cheaper”**.

Estas cifras deben clasificarse como **afirmaciones internas** porque:

- autores y evaluadores están vinculados al producto;
- no existe benchmark externo publicado que replique el resultado;
- el suite ha evolucionado junto con la metodología;
- la mezcla de proyectos, modelos, prompts y criterios limita generalización;
- “hasta” describe el extremo favorable, no el efecto esperado.

No es correcto concluir que Superpowers duplica la productividad de un equipo o
reduce a la mitad su factura total.

### 6.2 Snapshot de GitHub

La [API de GitHub](https://api.github.com/repos/obra/superpowers) reportaba el
21 de julio de 2026, aproximadamente:

| Señal | Valor |
|---|---:|
| Stars | 258.759 |
| Forks | 23.065 |
| Subscribers | 970 |
| Open issues | 325 |

Son señales fuertes de visibilidad e interés. No prueban:

- uso activo;
- retención;
- éxito de instalaciones;
- productividad;
- reducción de defectos;
- ROI empresarial.

La [oferta de Community Engineer](https://primeradiant.com/jobs/superpowers-community-engineer/)
afirma que lo usan desde desarrolladores individuales hasta organizaciones
grandes. Es una declaración empresarial sin cifras auditables.

### 6.3 Lo que no se conoce públicamente

No se localizaron métricas fiables de:

- usuarios activos o instalaciones;
- retención por versión;
- tiempo ahorrado en producción;
- costo total por feature;
- defectos evitados;
- tasa de aceptación de PR;
- impacto en incidentes o seguridad;
- ROI por organización.

El propio README dice que el equipo **no sabe cuántas personas usan
Superpowers** porque skills/plugins no entregan feedback suficiente.

### 6.4 Telemetría opcional

El companion visual de `brainstorming` puede cargar por defecto un logo de Prime
Radiant que incluye la versión de Superpowers. Según el README:

- no incluye proyecto, prompt ni coding agent;
- no registra clicks ni qué se está construyendo;
- sirve para una estimación aproximada de uso/versión;
- puede deshabilitarse con `SUPERPOWERS_DISABLE_TELEMETRY`;
- también respeta opt-outs documentados de Claude Code.

Aunque el alcance declarado es reducido, una organización debe revisar:

- tráfico saliente permitido;
- política de privacidad;
- comportamiento en entornos aislados;
- configuración corporativa para deshabilitarlo;
- cambios futuros del companion.

## 7. Madurez, pruebas y evaluaciones

Superpowers muestra varias señales de ingeniería:

- releases frecuentes hasta `v6.1.1`;
- pruebas de infraestructura en `tests/`;
- evaluaciones conductuales separadas;
- manifiestos e integración específicos por harness;
- guía formal de portabilidad;
- fixes derivados de sesiones reales;
- repositorio externo
  [`prime-radiant-inc/superpowers-evals`](https://github.com/prime-radiant-inc/superpowers-evals).

La [documentación de testing](https://github.com/obra/superpowers/blob/main/docs/testing.md)
distingue:

| Capa | Qué prueba |
|---|---|
| `tests/` | Código no LLM: plugins, manifests, hooks, servidor y utilidades |
| `evals/` / repositorio externo | Comportamiento real: triggering, worktrees, coordinación, verificación y review |

El repositorio de evals usa escenarios, criterios de aceptación, post-checks
deterministas y agentes reales. También advierte que los live evals ejecutan
CLIs con permisos amplios y no son un benchmark genérico.

### Límite de CI

Los checks estáticos/unitarios son aptos para CI pública. Los drills/live evals:

- consumen APIs/modelos;
- tardan minutos;
- requieren credenciales;
- ejecutan agentes con permisos amplios;
- no están plenamente integrados en CI pública.

La documentación histórica incluso señala que los escenarios LLM no formaban
parte de CI y proponía una estrategia por tiers. Por tanto, la existencia de
`evals/` mejora la capacidad de investigación, pero no significa que cada cambio
se valide automáticamente contra todos los modelos y harnesses.

## 8. Evidencia académica, empresarial y de autoridad

### 8.1 Evidencia directa sobre Superpowers

| Fuente | Qué aporta | Limitación |
|---|---|---|
| Repositorio y releases de `obra/superpowers` | Arquitectura, skills, workflow, compatibilidad, cambios y claims internos | Fuente del propio producto |
| Blog de Jesse Vincent | Origen, razonamiento, proceso manual y evolución | Experiencia del creador |
| Prime Radiant | Posicionamiento, soporte comercial y comunidad | Interés empresarial directo |
| `superpowers-evals` | Infraestructura reproducible para evaluar compliance y costo | No es benchmark independiente ni genérico |
| GitHub API | Señales públicas de popularidad y actividad | Popularidad no equivale a efectividad |

No se encontraron:

- ensayos controlados independientes;
- estudios longitudinales de equipos;
- comparaciones externas contra OpenSpec/GSD;
- auditorías públicas de ROI o defectos;
- benchmark ciego con protocolo preregistrado.

### 8.2 Autoridad industrial indirecta

La publicación de Birgitta Böckeler en Martin Fowler/Thoughtworks,
[“Understanding Spec-Driven-Development: Kiro, spec-kit, and Tessl”](https://martinfowler.com/articles/exploring-gen-ai/sdd-3-tools.html),
modificada el 15 de octubre de 2025, ayuda a situar el patrón:

- distingue **spec-first**, **spec-anchored** y **spec-as-source**;
- reconoce valor en preparar una spec antes de código;
- advierte que workflows únicos pueden ser overkill para cambios pequeños;
- describe sobrecarga de revisar numerosos Markdown;
- observa que más plantillas/checklists no garantizan seguimiento;
- recomienda pasos pequeños e iterativos.

Superpowers es principalmente **spec-first**: conserva diseño y plan, pero no
convierte por defecto la spec en fuente completa y evolutiva del comportamiento
del producto. Sus tareas pequeñas y reviews frecuentes responden a parte de las
advertencias, mientras que su ceremonia puede reproducir el problema de
overkill/review overload.

### 8.3 Evidencia académica indirecta

Los siguientes trabajos **no estudian ni validan Superpowers**. Solo sustentan
componentes del diseño.

#### Interfaces para agentes

John Yang et al.,
[“SWE-agent: Agent-Computer Interfaces Enable Automated Software Engineering”](https://arxiv.org/abs/2405.15793)
(arXiv:2405.15793), estudian cómo el diseño de una agent-computer interface
afecta el comportamiento y desempeño en tareas de ingeniería. Esto respalda la
tesis general de que herramientas, affordances y acciones disponibles importan.
No demuestra que el bootstrap o tool mapping de Superpowers sea óptimo.

#### Test-Driven Development

David S. Janzen y Hossein Saiedian,
[“Test-Driven Development: Concepts, Taxonomy, and Future Direction”](https://doi.org/10.1109/MC.2005.314),
*IEEE Computer* (2005), DOI `10.1109/MC.2005.314`, sistematizan conceptos,
taxonomía y agenda de TDD. Es apoyo para el componente RED-GREEN-REFACTOR, no
evidencia de que un LLM obligado por prompt ejecute TDD correctamente o produzca
mejores resultados.

#### Automatización de code review

Rosalia Tufano y Gabriele Bavota,
[“Automating Code Review: A Systematic Literature Review”](https://arxiv.org/abs/2503.09510)
(arXiv:2503.09510), revisan 119 trabajos sobre automatización de tareas de code
review, técnicas, datasets y métricas. Sustenta que el campo tiene métodos y
costos estudiados, pero no valida el reviewer LLM de Superpowers ni su esquema de
verdicts.

### Lectura correcta de la evidencia

La combinación permite decir:

- hay antecedentes para interfaces especializadas, TDD y revisión automatizada;
- existen razones plausibles para contexto fresco, tareas pequeñas y verificación;
- la implementación concreta de Superpowers sigue necesitando evaluación propia;
- sumar componentes razonables no garantiza un efecto neto positivo, porque
  también suma costo y puntos de fallo.

## 9. Riesgos y costos

### Ceremonia y overkill

Para un hotfix obvio, exigir brainstorming, diseño, plan granular, worktree, TDD,
review por tarea y review final puede tardar más que el cambio. El tamaño del
workflow debe ajustarse al riesgo.

### Dependencia del bootstrap

Si la inyección falla después de una actualización del harness:

- las skills quedan disponibles pero no se disparan;
- el agente puede implementar directamente;
- el usuario puede creer que los gates siguen activos.

Se necesitan smoke tests por versión de harness.

### Churn de plataformas

El retiro de Gemini CLI y los cambios de hook de Codex muestran que marketplaces,
eventos y formatos cambian. Una organización debe fijar versiones y verificar
actualizaciones antes de desplegarlas ampliamente.

### Scratch state vulnerable

`.superpowers/sdd/` es gitignored. `git clean -fdx` puede eliminar el ledger y
handoffs. Git permite reconstruir commits, no necesariamente todas las decisiones
o reportes.

### Costo de subagentes y review

Cada tarea puede generar:

- implementador;
- reviewer;
- fixer y re-review;
- review final;
- relectura de plan, briefs y diffs.

La serie 6 intenta reducir el costo, pero el flujo seguirá siendo más caro que
una implementación directa en tareas simples.

### Calidad correlacionada

Implementador y reviewer pueden:

- usar la misma familia de modelos;
- compartir sesgos;
- interpretar igual una spec ambigua;
- aprobar una solución incorrecta de forma consistente.

Review automatizado no sustituye pruebas independientes, observabilidad ni
revisión humana de alto riesgo.

### Permisos y supply chain

Plugins y agentes pueden ejecutar shell, Git y herramientas con permisos amplios.
La organización debe revisar:

- fuente y versión del plugin;
- permisos del harness;
- actualizaciones automáticas;
- egress y secretos;
- branch protection;
- comandos destructivos;
- logs/evals que puedan contener código sensible.

### Ausencia de benchmark externo

El mayor riesgo de decisión es confundir:

- popularidad con eficacia;
- eval interna con causalidad;
- ahorro de tokens del workflow con ahorro total;
- compliance del agente con calidad del producto.

## 10. Superpowers vs. OpenSpec vs. GSD Core

Versiones usadas como referencia:

- Superpowers [`v6.1.1`](https://github.com/obra/superpowers/releases/tag/v6.1.1);
- OpenSpec [`v1.6.0`](https://github.com/Fission-AI/OpenSpec/releases/tag/v1.6.0);
- GSD Core [`v1.7.0`](https://github.com/open-gsd/gsd-core/releases/tag/v1.7.0).

| Dimensión | Superpowers | OpenSpec | GSD Core |
|---|---|---|---|
| Propósito/filosofía | Disciplina operacional obligatoria mediante skills componibles | Capa ligera y fluida para acordar y persistir cambios de comportamiento | Context engineering y framework de ciclo completo |
| Unidad de trabajo | Diseño → plan → tareas de 2–5 min → implementación/review | Change en `openspec/changes/<id>/` | Milestone → phase → plan → tasks/waves |
| Flujo | Brainstorm → worktree → plan → SDD/execute → TDD/review → finish branch | Explore → propose → apply → sync/archive | Spec/discuss → plan → execute → verify → ship |
| Persistencia/artefactos | `docs/superpowers/specs/`, `plans/`; scratch `.superpowers/sdd/` | `proposal.md`, delta specs, `design.md`, `tasks.md`; archive y specs vigentes | `.planning/` con project, requirements, roadmap, state, context, plans, summaries, verification y UAT |
| Especificación | Diseño conversacional spec-first; no mantiene necesariamente specs vigentes por dominio | Su mayor fortaleza: specs vigentes + deltas persistentes | Requisitos/roadmap y `SPEC.md` opcional dentro de una fase/proyecto |
| Planificación | Muy granular, paths/código/pruebas/interfaces y restricciones globales | `tasks.md` más flexible; artefactos no son fases rígidas | Planes atómicos, dependencias, research, plan-checker y waves |
| Ejecución | Implementador fresco por tarea; ejecución por lotes alternativa | `apply`; la orquestación depende del agente | Ejecutores frescos, coordinación de waves y summaries |
| Subagentes/paralelismo | SDD por tarea y skill de agentes paralelos; depende del harness | No orquesta subagentes | Parte central del framework; subagentes especializados y paralelismo por waves |
| TDD | Gate fuerte RED-GREEN-REFACTOR | No lo impone por sí mismo | Gates/pruebas configurables, menos identitario que en Superpowers |
| Verificación/review | Review por tarea con verdicts + review final + verificación antes de completar | Validación estructural; verify agentivo opcional/blando | Plan-checker, verifier, tests y UAT |
| Git/worktrees/PR | Worktree aislado y cierre explícito: merge/PR/conservar/descartar | No gestiona Git | Commits, ramas/worktrees y preparación de PR |
| Enforcement | Alto en el plano conductual si el bootstrap funciona; no es control determinista | Blando: skills/prompts y disciplina del usuario | Alto en runtimes bien integrados; en Copilot el `sessionStart` es advisory y menor que en Claude Code |
| Compatibilidad | 10 harnesses documentados al corte; integración distinta por plataforma | Más de 30 asistentes declarados; en Copilot CLI skills sí, prompt files no | Varios runtimes; profundidad variable por hooks, skills y agentes |
| Ceremonia/costo | Media/alta; subagentes y review elevan tokens/latencia | Baja/media | Alta; mayor cantidad de estado, agentes y artefactos |
| Mejor caso de uso | Feature mediana/grande donde TDD, review y autonomía controlada sean prioritarios | Brownfield incremental y cambios pequeños/medianos que necesitan contrato durable | Trabajo grande, multifase o multisesión que necesita memoria y ciclo completo |
| Evidencia disponible | Evals y claims internos; mucha popularidad; sin benchmark independiente | Sin evidencia causal independiente | Sin evidencia causal independiente |

### Diferencia esencial

- **OpenSpec controla mejor el “qué cambia”** y conserva el delta.
- **GSD Core controla mejor el “estado del proyecto y del ciclo”**.
- **Superpowers controla con más fuerza el “cómo debe comportarse el agente ahora”**.

### Combinaciones posibles

No es recomendable instalar los tres sin diseño de gobernanza: se duplicarían
planes, instrucciones, hooks y fuentes de verdad.

Una integración razonable podría ser:

- OpenSpec como contrato persistente;
- Superpowers como disciplina de implementación;
- una sola ubicación canónica para tasks/plan;
- GSD Core solo para iniciativas que necesiten milestones y `.planning/`.

Antes de combinar, debe decidirse:

1. qué artefacto manda ante contradicción;
2. quién archiva/sincroniza;
3. qué workflow dispara primero;
4. qué herramienta controla Git;
5. qué reviews son redundantes;
6. cuánto presupuesto de tokens y tiempo se acepta.

## 11. Recomendación de adopción

### Recomendación

Adoptar Superpowers inicialmente en un **piloto acotado de 4–6 semanas** con:

- 2–4 equipos voluntarios;
- repositorios con pruebas existentes;
- cambios medianos comparables;
- permisos de shell/Git conservadores;
- revisión humana y CI obligatorios;
- versiones fijadas de plugin y harness;
- telemetría opcional revisada o deshabilitada;
- registro de modelo, versión, tokens, tiempo y resultado.

No comenzar por:

- incidentes de producción;
- migraciones irreversibles;
- código regulado o safety-critical;
- cambios sin test harness;
- tareas triviales donde la ceremonia domine.

### Diseño de evaluación

#### Opción preferida: A/B pareado

1. Seleccionar pares de tareas semejantes por repositorio, complejidad y riesgo.
2. Asignar aleatoriamente una tarea a flujo habitual y otra a Superpowers.
3. Mantener iguales modelo, harness, permisos y criterios de aceptación.
4. Medir trabajo humano y consumo automatizado completo.
5. Hacer revisión ciega del resultado cuando sea posible.
6. Repetir en suficientes tareas para no decidir por un único caso.

#### Alternativa: antes/después

Comparar un periodo base con un periodo Superpowers, controlando:

- tamaño de cambio;
- experiencia del equipo;
- modelo/harness;
- cobertura de pruebas;
- tipo de repositorio;
- incidentes y cambios de plataforma.

Es más fácil, pero confunde el efecto con aprendizaje, estacionalidad y cambios de
modelo.

### Métricas mínimas

| Métrica | Cómo medirla |
|---|---|
| Lead time | Desde aceptación de la tarea hasta PR listo y hasta merge |
| Tokens/costo | Input, output, cache, subagentes, reviewers y reintentos por tarea |
| Retrabajo | Commits/fixes posteriores a “done”, cambios pedidos y código revertido |
| Defect escape | Bugs encontrados después de merge o en QA/UAT |
| Pass rate de tests | Primera ejecución, antes de PR y después de merge |
| Hallazgos de review | Critical/Important/Minor, verdaderos positivos y repetidos |
| Cumplimiento del plan | Tareas completadas, desviaciones justificadas y requisitos omitidos |
| Intervención humana | Preguntas, correcciones, minutos de supervisión y rescates manuales |
| Tiempo autónomo útil | Duración sin intervención que termina en resultado aceptable |
| Tasa de aceptación | PR aceptado sin reescritura mayor |

### Criterios de salida

Escalar solo si:

- reduce lead time o intervención sin aumentar defect escape;
- el costo adicional es predecible;
- los equipos realmente leen diseño/plan;
- los smoke tests confirman bootstrap por harness;
- la tasa de falsos positivos de review es manejable;
- la recuperación de sesiones funciona;
- no aparecen incidentes de permisos o supply chain.

Retirar o limitar si:

- aumenta review overload;
- los planes se vuelven documentación no leída;
- el ahorro del agente se convierte en más supervisión humana;
- las tareas pequeñas pagan la misma ceremonia que las grandes;
- actualizaciones de harness rompen gates silenciosamente.

## 12. Conclusión

Superpowers es uno de los frameworks más visibles y prescriptivos para desarrollo
agéntico. Su aportación principal no es inventar TDD, especificaciones, worktrees
o code review, sino convertirlos en skills componibles con activación automática
y un workflow que intenta impedir atajos comunes del agente.

Su diseño es más operacional que OpenSpec y menos orientado a memoria integral
que GSD Core. Es especialmente atractivo cuando la organización quiere autonomía
por tareas sin renunciar a diseño aprobado, TDD, review y cierre Git disciplinado.
Puede ser excesivo para cambios pequeños y depende críticamente de la calidad de
integración del harness.

La evidencia pública permite afirmar que el proyecto es popular, activo y cuenta
con una infraestructura seria de evaluaciones internas. No permite afirmar que
sea causalmente más rápido, barato o confiable en una organización concreta. La
decisión responsable es pilotar, medir el sistema completo y conservar controles
externos.

## Bibliografía

### Superpowers — fuentes primarias

- Vincent, Jesse / obra.
  [Superpowers — repositorio canónico](https://github.com/obra/superpowers).
- Superpowers.
  [README](https://github.com/obra/superpowers/blob/main/README.md).
- Superpowers.
  [Porting Superpowers to a New Harness](https://github.com/obra/superpowers/blob/main/docs/porting-to-a-new-harness.md).
- Superpowers.
  [`using-superpowers`](https://github.com/obra/superpowers/blob/main/skills/using-superpowers/SKILL.md).
- Superpowers.
  [`subagent-driven-development`](https://github.com/obra/superpowers/blob/main/skills/subagent-driven-development/SKILL.md).
- Superpowers.
  [Testing Superpowers](https://github.com/obra/superpowers/blob/main/docs/testing.md).
- Superpowers.
  [Release `v6.0.0`](https://github.com/obra/superpowers/releases/tag/v6.0.0).
- Superpowers.
  [Release `v6.0.3`](https://github.com/obra/superpowers/releases/tag/v6.0.3).
- Superpowers.
  [Release `v6.1.0`](https://github.com/obra/superpowers/releases/tag/v6.1.0).
- Superpowers.
  [Release `v6.1.1`](https://github.com/obra/superpowers/releases/tag/v6.1.1).
- GitHub.
  [API del repositorio `obra/superpowers`](https://api.github.com/repos/obra/superpowers).
- Vincent, Jesse. 5-10-2025.
  [How I’m using coding agents in September, 2025](https://blog.fsck.com/2025/10/05/how-im-using-coding-agents-in-september-2025/).
- Vincent, Jesse. 9-10-2025.
  [Superpowers](https://blog.fsck.com/2025/10/09/superpowers/).
- Vincent, Jesse. 15-06-2026.
  [Superpowers 6](https://blog.fsck.com/2026/06/15/Superpowers-6/).
- Prime Radiant.
  [Superpowers](https://primeradiant.com/superpowers/).
- Prime Radiant.
  [Superpowers Community Engineer](https://primeradiant.com/jobs/superpowers-community-engineer/).
- Prime Radiant.
  [superpowers-evals](https://github.com/prime-radiant-inc/superpowers-evals).

### OpenSpec y GSD Core

- Fission AI.
  [OpenSpec](https://github.com/Fission-AI/OpenSpec).
- Fission AI.
  [OpenSpec `v1.6.0`](https://github.com/Fission-AI/OpenSpec/releases/tag/v1.6.0).
- Open GSD.
  [GSD Core](https://github.com/open-gsd/gsd-core).
- Open GSD.
  [GSD Core `v1.7.0`](https://github.com/open-gsd/gsd-core/releases/tag/v1.7.0).
- [OpenSpec para un SDLC basado en GitHub Copilot](OpenSpec.md).
- [Open GSD y GSD Core para un SDLC basado en GitHub Copilot](OpenGSD.md).
- [Open GSD vs. OpenSpec para un SDLC centrado en GitHub Copilot](OpenGSD-vs-OpenSpec.md).

### Evidencia industrial y académica indirecta

- Böckeler, Birgitta. Martin Fowler / Thoughtworks. Modificado el 15-10-2025.
  [Understanding Spec-Driven-Development: Kiro, spec-kit, and Tessl](https://martinfowler.com/articles/exploring-gen-ai/sdd-3-tools.html).
- Yang, John; Jimenez, Carlos E.; Wettig, Alexander; Lieret, Kilian; Yao, Shunyu;
  Narasimhan, Karthik; Press, Ofir. 2024.
  [SWE-agent: Agent-Computer Interfaces Enable Automated Software Engineering](https://arxiv.org/abs/2405.15793),
  arXiv:2405.15793.
- Janzen, David S.; Saiedian, Hossein. 2005.
  [Test-Driven Development: Concepts, Taxonomy, and Future Direction](https://doi.org/10.1109/MC.2005.314),
  *IEEE Computer*, DOI `10.1109/MC.2005.314`.
- Tufano, Rosalia; Bavota, Gabriele. 2025.
  [Automating Code Review: A Systematic Literature Review](https://arxiv.org/abs/2503.09510),
  arXiv:2503.09510.
