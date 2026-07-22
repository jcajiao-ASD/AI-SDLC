---
id: openspec
title: "OpenSpec para un SDLC basado en GitHub Copilot"
slug: openspec
summary: "Investiga OpenSpec como capa ligera de especificaciones y cambios persistentes para desarrollo asistido por agentes."
category: metodologias
status: vigente
cutoffDate: "2026-07-20"
revalidateAfter: "2027-01-20"
evidenceLevel: mixta
decisionType: evaluacion-framework
role: catalog
---

# OpenSpec para un SDLC basado en GitHub Copilot

> **Fecha de corte:** 20 de julio de 2026.  
> **Conclusión de evidencia:** no se encontraron estudios independientes y controlados que demuestren que OpenSpec mejora productividad, calidad o defectos. Su diseño hace explícitos intención, deltas y tareas; eso es una ventaja estructural plausible, no una garantía causal.

## Resumen ejecutivo

OpenSpec es una capa ligera de acuerdo entre personas y agentes de código. Mantiene dos espacios:

- `openspec/specs/`: comportamiento vigente del sistema;
- `openspec/changes/`: propuestas activas, con deltas, diseño y tareas.

El flujo habitual es **explore → propose → apply → sync → archive**. En el perfil ampliado se añaden acciones como `new`, `continue`, `ff`, `verify`, `bulk-archive` y `onboard`. OpenSpec insiste en que son **acciones fluidas, no fases rígidas**.

Para una organización que ya usa GitHub Copilot, OpenSpec tiene una integración útil pero con un matiz crítico:

- **Copilot IDE** puede consumir los prompt files `.github/prompts/opsx-*.prompt.md`;
- **Copilot CLI no consume esos prompt files**, pero sí descubre las skills de `.github/skills/openspec-*/SKILL.md`.

En CLI, por tanto, no debe asumirse que `/opsx-propose` aparecerá como prompt command. Se debe pedir a Copilot que use la skill correspondiente, por ejemplo: `Usa /openspec-propose para...`.

OpenSpec es especialmente atractivo para brownfield y cambios pequeños/medianos: agrega poca ceremonia, no controla Git y deja artefactos simples. Su límite es el reverso de esa ligereza: no ofrece por sí mismo la orquestación de subagentes, el manejo de contexto, los commits, el PR ni los gates operativos de un framework de ciclo completo.

## 1. Qué es y estado verificado

La [documentación oficial](https://openspec.dev/docs) lo describe como una forma de acordar qué construir antes de escribir código. Es:

- un CLI (`openspec`) para inicializar, inspeccionar, validar y archivar;
- un conjunto de skills/comandos generados para agentes;
- una convención de archivos Markdown/YAML versionables;
- un modelo de cambios incrementales basado en deltas.

No es:

- un modelo de IA;
- un agente de codificación autónomo;
- un motor de CI;
- un gestor de ramas o PR;
- una garantía de que el agente respete la especificación.

### Versión

Al corte:

- [`@fission-ai/openspec` 1.6.0](https://github.com/Fission-AI/OpenSpec/releases/tag/v1.6.0) fue publicado el **10-07-2026** como release estable (`prerelease: false`);
- el [registro npm](https://registry.npmjs.org/@fission-ai%2Fopenspec) marcaba `latest: 1.6.0`;
- el [`package.json` de 1.6.0](https://github.com/Fission-AI/OpenSpec/blob/v1.6.0/package.json) exige **Node.js >=20.19.0**;
- licencia MIT.

El hallazgo preliminar “versión candidata 1.6.0” queda corregido: era la versión estable.

## 2. Modelo spec-driven

### Specs vigentes

Según [Core Concepts](https://github.com/Fission-AI/OpenSpec/blob/v1.6.0/docs/overview.md), una spec describe cómo se comporta el sistema **ahora**:

```text
openspec/specs/
├── auth/spec.md
├── payments/spec.md
└── search/spec.md
```

Las specs se organizan por dominio y contienen:

- requisitos normativos;
- escenarios concretos, normalmente expresables como given/when/then;
- comportamiento vigente, no el historial completo de conversaciones.

### Changes

Cada unidad de trabajo vive en:

```text
openspec/changes/<nombre-del-cambio>/
├── .openspec.yaml
├── proposal.md
├── design.md
├── tasks.md
└── specs/
    └── <dominio>/spec.md
```

Los artefactos responden a:

| Artefacto | Pregunta |
|---|---|
| `proposal.md` | ¿Por qué y qué cambia? |
| delta `spec.md` | ¿Qué comportamiento se añade, modifica, elimina o renombra? |
| `design.md` | ¿Cómo se implementará? |
| `tasks.md` | ¿Qué pasos ejecutables quedan? |

### Delta specs

Un delta no reescribe todo el sistema. Declara:

- `ADDED`;
- `MODIFIED`;
- `REMOVED`;
- `RENAMED`.

Al archivar, el delta se fusiona en `openspec/specs/` y el change pasa a:

```text
openspec/changes/archive/YYYY-MM-DD-<nombre>/
```

Este patrón es adecuado para brownfield porque documenta solo la porción tocada. La [guía de proyectos existentes](https://github.com/Fission-AI/OpenSpec/blob/v1.6.0/docs/existing-projects.md) recomienda no “documentar todo” antes de empezar.

### Fuente de verdad y riesgo de drift

OpenSpec llama a `openspec/specs/` fuente de verdad. En la práctica, la fuente de verdad operativa sigue repartida entre:

- comportamiento desplegado;
- código;
- pruebas;
- contratos externos;
- specs.

Si no se sincroniza/archiva, la spec puede quedar por detrás del código. Si se archiva una especificación incorrecta, puede convertirse en contexto persistente erróneo. La disciplina de revisión es indispensable.

## 3. Workflow y comandos

### Dos superficies

La [guía “How Commands Work”](https://github.com/Fission-AI/OpenSpec/blob/v1.6.0/docs/how-commands-work.md) distingue:

- `openspec ...`: terminal;
- `/opsx:...`: chat del agente, con sintaxis adaptada a cada herramienta.

### Perfil core

El [workflow oficial](https://github.com/Fission-AI/OpenSpec/blob/v1.6.0/docs/workflows.md) usa:

```text
/opsx:explore → /opsx:propose → /opsx:apply → /opsx:sync → /opsx:archive
```

- **Explore:** investiga y conversa; no crea artefactos ni código.
- **Propose:** genera propuesta, specs, diseño y tareas.
- **Apply:** implementa y marca tareas.
- **Update:** añadido en 1.6.0; revisa artefactos existentes sin editar código.
- **Sync:** fusiona deltas en specs vigentes sin archivar.
- **Archive:** comprueba estado, ofrece sincronizar y mueve el change.

Algunas páginas de 1.6.0 aún enumeran el perfil core sin `update`; el [release 1.6.0](https://github.com/Fission-AI/OpenSpec/releases/tag/v1.6.0) y la [referencia de comandos](https://github.com/Fission-AI/OpenSpec/blob/v1.6.0/docs/commands.md) confirman su incorporación. Es un ejemplo de drift documental que conviene contemplar al actualizar.

### Perfil ampliado

Se pueden habilitar:

- `/opsx:new`: crea el scaffold;
- `/opsx:continue`: genera el siguiente artefacto;
- `/opsx:ff`: genera todos los artefactos disponibles;
- `/opsx:verify`: revisa completitud, corrección y coherencia;
- `/opsx:bulk-archive`: archiva cambios en lote;
- `/opsx:onboard`: tutorial guiado.

OpenSpec dice explícitamente que `verify` **no bloquea** el archive y que archive advierte, pero tampoco bloquea necesariamente, tareas incompletas. Son ayudas, no gates duros.

### CLI

La [referencia CLI](https://github.com/Fission-AI/OpenSpec/blob/v1.6.0/docs/cli.md) ofrece:

```bash
openspec init
openspec update
openspec list
openspec show <item>
openspec status
openspec validate --all --strict
openspec view
openspec archive <change>
```

Varios comandos producen JSON para agentes/scripts. La validación CLI se centra en estructura y consistencia de artefactos; no equivale a demostrar que la implementación satisface el negocio.

## 4. Cómo influye realmente sobre Copilot

### Archivos generados

Para `github-copilot`, la [matriz oficial de herramientas](https://github.com/Fission-AI/OpenSpec/blob/v1.6.0/docs/supported-tools.md) indica:

```text
.github/skills/openspec-*/SKILL.md
.github/prompts/opsx-<id>.prompt.md
```

OpenSpec también usa `openspec/config.yaml` para:

- seleccionar schema;
- inyectar contexto del proyecto;
- añadir reglas por artefacto.

El diseño oficial muestra que contexto y reglas se insertan en las instrucciones que recibe el agente. Es una influencia directa sobre el prompt, no sobre los pesos del modelo.

### Copilot IDE versus Copilot CLI

Este matiz debe quedar en la política de adopción:

| Superficie | Skills `.github/skills` | Prompt files `.github/prompts` |
|---|---:|---:|
| Copilot en VS Code/JetBrains/Visual Studio | Sí | Sí |
| Copilot CLI | Sí | **No** |

GitHub confirma en su [matriz de personalización](https://docs.github.com/en/copilot/reference/customization-cheat-sheet) que Copilot CLI soporta skills, pero no prompt files.

Consecuencia:

- en IDE puede aparecer `/opsx-propose`;
- en CLI se debe invocar o describir la skill, por ejemplo `Usa /openspec-propose...`;
- decir simplemente “ejecuta `/opsx:propose`” en CLI puede no activar ningún prompt file.

### Selección probabilística

Copilot decide cuándo cargar una skill a partir de nombre, descripción y prompt. El usuario puede forzarla mencionando `/nombre-skill`. Aun cargada:

- el modelo puede interpretar mal una instrucción;
- puede omitir una comprobación;
- puede editar artefactos y código de forma incoherente;
- las pruebas pueden ser insuficientes.

OpenSpec estructura el contexto; no impone ejecución determinista.

### Qué no añade

OpenSpec no instala un orquestador de subagentes comparable a GSD Core. Copilot CLI puede delegar por sus propias capacidades, pero OpenSpec:

- no crea olas de ejecución;
- no asigna un contexto fresco por plan;
- no administra commits;
- no crea ramas o PR;
- no instala gates de seguridad del runtime;
- no monitoriza contexto.

## 5. Ventajas potenciales

> Valoración analítica; no resultado experimental.

1. **Ligereza:** pocos conceptos y archivos.
2. **Brownfield-first:** los deltas evitan reespecificar sistemas completos.
3. **Revisión temprana:** propuesta y escenarios se pueden corregir antes del diff.
4. **Separación entre vigente y propuesto:** `specs/` frente a `changes/`.
5. **Historial legible:** archive conserva por qué y cómo cambió el sistema.
6. **Portabilidad:** Markdown/YAML dentro de Git.
7. **Independencia del agente:** puede usarse con Copilot u otros runtimes.
8. **Control del equipo sobre Git:** OpenSpec no impone ramas, commits ni PR.
9. **Cambios paralelos:** cada change ocupa una carpeta distinta.
10. **Customización:** contexto/reglas por proyecto y schemas personalizados.
11. **Multirrepo opcional:** stores permiten separar planificación, aunque estaban en beta.

## 6. Límites, riesgos y costos

### No hay enforcement fuerte

La filosofía “enablers, not gates” facilita iteración, pero permite:

- aplicar antes de revisar;
- archivar con warnings;
- omitir verify;
- dejar tareas o specs desactualizadas.

La organización debe añadir checks de CI y políticas de PR si necesita obligatoriedad.

### Verificación basada en el mismo agente

`/opsx:verify` busca evidencia de completitud, corrección y coherencia, pero normalmente usa el mismo runtime/modelo que ayudó a implementar. No es independencia real. Debe complementarse con:

- pruebas deterministas;
- revisión humana;
- análisis estático y seguridad;
- validación del comportamiento desplegado.

### Cambio pequeño versus ceremonia

Para una modificación de una línea, proposal + delta + design + tasks + archive puede no compensar. OpenSpec reconoce esta sobrecarga.

### Cambios grandes

La ligereza se vuelve un límite si se necesita:

- coordinación de dependencias entre muchos equipos;
- ownership formal;
- secuenciación operativa;
- control de contexto;
- ejecución paralela gobernada;
- evidencia de release/operación.

Los stores multirrepo estaban en **beta**; no deben tratarse como interfaz estable.

### Conflictos y fuente de verdad

Dos changes pueden modificar la misma spec. OpenSpec detecta/ayuda a resolver conflictos al archivar en lote, pero la resolución sigue dependiendo del agente y de Git. Debe prevalecer el comportamiento real aprobado.

### Telemetría

El README 1.6.0 declara telemetría anónima de nombre de comando y versión, sin argumentos, rutas, contenido ni PII, y ofrece:

```bash
export OPENSPEC_TELEMETRY=0
# o
export DO_NOT_TRACK=1
```

Una organización regulada debe validar esa implementación y decidir si deshabilitarla por defecto.

### Supply chain

El instalador escribe skills y prompts que pueden inducir ejecución de shell. Deben fijarse versiones, comprobar integridad, revisar archivos y evitar preaprobaciones amplias.

## 7. Aporte potencial por fase del SDLC

| Fase del SDLC | Aporte de OpenSpec | Límite |
|---|---|---|
| Descubrimiento | Explore inspecciona código y contrasta opciones | No crea investigación persistente por defecto |
| Requisitos | Requisitos y escenarios de comportamiento | No sustituye discovery ni aprobación de negocio |
| Arquitectura | `design.md` registra decisiones | No hace análisis arquitectónico profundo por sí solo |
| Planificación | `tasks.md`, proposal y deltas | Menos soporte para dependencias/olas |
| Construcción | Apply ejecuta tareas y marca progreso | No gobierna subagentes ni commits |
| Pruebas | Escenarios sirven de base; verify busca cobertura | Verify es opcional/no bloqueante |
| Seguridad | Se pueden añadir reglas y tareas de seguridad | No trae gates de seguridad deterministas |
| Revisión | PR puede contener plan, delta y código | OpenSpec no crea ni administra el PR |
| Release | Sync/archive actualizan verdad vigente | No despliega ni etiqueta releases |
| Operación | Specs vigentes ayudan a mantenimiento/onboarding | No ofrece observabilidad ni gestión operativa |

## 8. Instalación y tutorial reproducible con Copilot

### Opción local recomendada

Si el repositorio ya usa npm, instale como dependencia de desarrollo exacta:

```bash
node --version   # >=20.19.0
npm view @fission-ai/openspec@1.6.0 version engines repository dist.integrity
git switch -c pilot/openspec-1.6.0
npm install --save-dev --save-exact @fission-ai/openspec@1.6.0
```

Así la versión queda en el lockfile. Ejecute:

```bash
npx openspec init --tools github-copilot --profile core
git status --short
git diff -- openspec .github package.json package-lock.json
```

Revise:

- `openspec/config.yaml`;
- `.github/skills/openspec-*/SKILL.md`;
- `.github/prompts/opsx-*.prompt.md`;
- comandos shell y permisos declarados;
- scripts postinstall del paquete;
- telemetría y políticas de red.

Si no es aceptable añadir una dependencia Node al repositorio, use una instalación global **fijada** y registrada en el entorno de desarrollo:

```bash
npm install -g @fission-ai/openspec@1.6.0
```

No use `@latest` en un piloto reproducible.

### Arranque de Copilot CLI con el binario local

Para que las skills encuentren `openspec`, incluya `node_modules/.bin` en el `PATH` de la sesión:

```bash
PATH="$PWD/node_modules/.bin:$PATH" copilot
```

Dentro de Copilot:

```text
/skills reload
/skills list
/skills info openspec-propose
/env
```

Recuerde: `.github/prompts/*.prompt.md` no se consume en CLI.

### Tutorial de un cambio brownfield

1. **Explorar sin escribir artefactos:**

   ```text
   Usa la skill /openspec-explore para analizar cómo añadir rate limiting
   al API público. No edites archivos. Identifica flujo actual, opciones,
   riesgos y preguntas pendientes.
   ```

2. **Proponer:**

   ```text
   Usa la skill /openspec-propose para crear el cambio
   add-public-api-rate-limiting a partir de la exploración. No implementes.
   ```

3. **Revisar manualmente:**

   ```bash
   npx openspec show add-public-api-rate-limiting
   npx openspec validate add-public-api-rate-limiting --strict
   ```

   Compruebe alcance, escenarios negativos, compatibilidad, observabilidad, rollback y pruebas.

4. **Aplicar:**

   ```text
   Usa la skill /openspec-apply-change para implementar
   add-public-api-rate-limiting. Ejecuta solo los comandos aprobados,
   actualiza tasks.md y detente ante cualquier contradicción.
   ```

5. **Verificar:**

   El perfil core puede no incluir la skill `verify`. Habilítela de forma explícita:

   ```bash
   npx openspec config profile
   # seleccionar verify y las acciones deseadas
   npx openspec update
   ```

   Reinicie/recargue:

   ```text
   /skills reload
   Usa la skill /openspec-verify-change para contrastar implementación,
   pruebas y escenarios. No archives si hay findings abiertos.
   ```

6. **Validar estructura y revisar diff:**

   ```bash
   npx openspec validate --all --strict
   ```

   En Copilot:

   ```text
   /diff
   /review
   ```

7. **Sincronizar y archivar solo después del merge o según convención:**

   ```text
   Usa /openspec-sync-specs para mostrar primero el delta que se fusionará.
   ```

   Después:

   ```text
   Usa /openspec-archive-change para archivar el cambio. Confirma que todas
   las tareas, pruebas y aprobaciones humanas estén completas.
   ```

### Convención Git recomendada

OpenSpec [no toca Git](https://github.com/Fission-AI/OpenSpec/blob/v1.6.0/docs/team-workflow.md). Una secuencia segura:

```text
rama → proposal/delta revisado → implementación → CI/revisión → merge
→ sync/archive en main o follow-up controlado
```

Defina una sola convención para evitar que `openspec/specs/` declare como vigente algo que aún no se desplegó.

## 9. Métricas y evidencia

### Evidencia directa sobre efectividad

**No encontrada.** No se localizaron comparaciones controladas de:

- Copilot con OpenSpec versus Copilot sin OpenSpec;
- defectos o retrabajo;
- velocidad de entrega;
- calidad de requisitos;
- precisión de implementación;
- costo total del workflow.

### Microbenchmark interno

El repositorio conserva tareas internas para medir lectura de `openspec/config.yaml` con 1 KB, 50 KB y lecturas repetidas, con objetivos `<10 ms` típico y `<50 ms` aceptable. No se localizaron resultados publicados y reproducibles en la documentación consultada. Aun si existieran, medirían rendimiento del parser/config, **no calidad agentiva ni productividad**.

### Señales de adopción

Consultas a APIs oficiales al 20-07-2026:

- repositorio `Fission-AI/OpenSpec`: aproximadamente **61.788 stars** y **4.277 forks**;
- npm, periodo 21-06 a 20-07-2026: **990.742 descargas**.

Son señales de interés/adopción, no de efectividad. Descargas incluyen CI, reinstalaciones y uso experimental.

### Evidencia indirecta — no atribuible a OpenSpec

| Estudio | Resultado | Relevancia | Límite |
|---|---|---|---|
| [FeatBench](https://arxiv.org/abs/2509.22237) | 157 tareas/27 repos; mejor resolved rate 29,94%; scope creep y regresiones | Refuerza la necesidad de intención explícita y pruebas de regresión | No evalúa OpenSpec |
| [FeatureBench](https://arxiv.org/abs/2602.10975) | 200 tareas/24 repos; Claude 4.5 Opus resolvió 11% en la versión inicial | Features end-to-end siguen siendo difíciles | No compara especificaciones ni Copilot |
| [PlanSearch, ICLR 2025](https://proceedings.iclr.cc/paper_files/paper/2025/hash/071a637d41ea290ac4360818a8323f33-Abstract-Conference.html) | Buscar sobre planes en lenguaje natural elevó pass@200 en LiveCodeBench de 60,6% a 77,0% frente a muestreo repetido | Los planes pueden diversificar soluciones | Problemas algorítmicos, 200 muestras; muy distinto del SDLC |
| [CodePlan, FSE 2024](https://www.microsoft.com/en-us/research/publication/codeplan-repository-level-coding-using-llms-and-planning-2/) | 5/7 repos pasaron validez con planificación; 0/7 baselines | Planificación ayuda en cambios multiarchivo | Sistema neuro-simbólico distinto |
| [UTBoost, ACL 2025](https://aclanthology.org/2025.acl-long.189/) | 345 parches previamente “válidos” fallaron pruebas ampliadas | Escenarios/pruebas originales pueden ser insuficientes | No mide OpenSpec |
| [METR 2025/2026](https://metr.org/blog/2026-02-24-uplift-update/) | Estudio temprano halló 19% de ralentización; continuación 2026 quedó afectada por fuerte sesgo de selección | Obliga a medir productividad localmente | No estudia OpenSpec; METR cree que herramientas actuales probablemente aceleran más, sin estimación fiable |

## 10. Testimonios

### Usuarios externos

- **Vinicius Ferreira Negrisolo, Hashrocket:** en una [comparación de octubre de 2025](https://hashrocket.com/blog/posts/openspec-vs-spec-kit-choosing-the-right-ai-driven-development-workflow-for-your-team) reportó onboarding más simple, aproximadamente 250 líneas generadas frente a 800 con Spec Kit para la misma tarea y una implementación que identificó riesgos CSS. **Límites:** una tarea sencilla, versiones antiguas, herramientas no deterministas; el autor admite prompt poco refinado y haber priorizado velocidad sobre revisión.
- **Dan Clarke:** tras alrededor de un mes de uso, [destaca explore y las specs como “context primers”](https://www.danclarke.com/openspec/). También reconoce que se puede construir la misma práctica con skills propias y que las specs pueden quedar desactualizadas. **Límites:** experiencia individual, sin métricas ni grupo control.
- **Apurv Sheth:** afirma en su [relato de uso](https://apurvsheth.medium.com/how-openspec-actually-works-a-three-phase-workflow-that-keeps-ai-honest-3d4aeb61e9fa) haber usado verify en unas 30 features y encontrar gaps en alrededor de un tercio. **Límites:** cifra auto-reportada sin datos; además describe un “state machine estricto” incompatible con la documentación oficial 1.6.0, que define acciones fluidas y verify no bloqueante. Debe tratarse como experiencia de una versión/configuración concreta, no como descripción normativa.
- **Sanjeev (`ksanjeev9211`):** en el [issue #1141](https://github.com/Fission-AI/OpenSpec/issues/1141) dice usar OpenSpec en modernización brownfield Java/Spring Boot y considerarlo muy valioso, pero reporta fricción organizacional por la carpeta visible `openspec/`. **Límites:** solicitud de feature, sin métricas y con posible sesgo de usuario comprometido.

### Mantenedores y autores — no evidencia independiente

El README y la documentación oficial sostienen que OpenSpec facilita acuerdo, reduce desvíos y escala de proyectos personales a empresas. Son explicaciones de diseño y posicionamiento del propio proyecto; no deben mezclarse con testimonios externos ni con pruebas controladas.

## 11. Recomendación de adopción

### Recomendación

**Adoptar como convención ligera de especificación para un piloto brownfield, especialmente en cambios pequeños y medianos; no asumir que cubre todo el SDLC.**

Es una buena opción cuando:

- Copilot ya es el agente principal;
- se busca mejorar prompts mediante artefactos revisables;
- el equipo quiere control total sobre Git/PR;
- la base existente no está completamente documentada;
- se prefiere crecer specs por delta.

No basta por sí solo cuando se necesita:

- ejecución multiagente gobernada;
- recuperación robusta de contexto entre grandes fases;
- commits/PR automatizados;
- gates obligatorios;
- coordinación operativa y release;
- medición de costo/uso por agente.

### Controles organizacionales sugeridos

1. Toda proposal debe revisarse antes de apply.
2. Todo requisito debe tener escenario verificable o juicio humano explícito.
3. `openspec validate --all --strict` en CI.
4. Verify obligatorio por política, aunque OpenSpec no lo bloquee.
5. CI y code owners prevalecen sobre la declaración del agente.
6. Archive solo según una convención ligada al merge/deploy.
7. Telemetría deshabilitada si la política lo exige.
8. Versiones exactas y actualización de skills revisada en PR.

### Métricas del piloto

- tiempo desde intención hasta plan aprobado;
- porcentaje de proposals corregidas antes de código;
- tareas añadidas/eliminadas durante apply;
- requisitos sin prueba;
- findings de verify y revisión humana;
- retrabajo post-PR;
- drift entre specs y producción;
- tiempo/costo de ceremonia;
- utilidad de specs para un cambio posterior;
- costo/tokens de Copilot por cambio.

## Bibliografía

### Fuentes oficiales de OpenSpec

- [Documentación](https://openspec.dev/docs)
- [Repositorio](https://github.com/Fission-AI/OpenSpec)
- [README 1.6.0](https://github.com/Fission-AI/OpenSpec/blob/v1.6.0/README.md)
- [Release 1.6.0](https://github.com/Fission-AI/OpenSpec/releases/tag/v1.6.0)
- [Core Concepts](https://github.com/Fission-AI/OpenSpec/blob/v1.6.0/docs/overview.md)
- [Workflows](https://github.com/Fission-AI/OpenSpec/blob/v1.6.0/docs/workflows.md)
- [Comandos](https://github.com/Fission-AI/OpenSpec/blob/v1.6.0/docs/commands.md)
- [CLI](https://github.com/Fission-AI/OpenSpec/blob/v1.6.0/docs/cli.md)
- [Herramientas soportadas](https://github.com/Fission-AI/OpenSpec/blob/v1.6.0/docs/supported-tools.md)
- [Proyectos existentes](https://github.com/Fission-AI/OpenSpec/blob/v1.6.0/docs/existing-projects.md)
- [Trabajo en equipo/Git](https://github.com/Fission-AI/OpenSpec/blob/v1.6.0/docs/team-workflow.md)
- [Instalación](https://github.com/Fission-AI/OpenSpec/blob/v1.6.0/docs/installation.md)
- [Paquete npm](https://www.npmjs.com/package/@fission-ai/openspec)

### GitHub Copilot

- [Uso de Copilot CLI](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/use-copilot-cli)
- [Skills de Copilot CLI](https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/add-skills)
- [Matriz de personalización](https://docs.github.com/en/copilot/reference/customization-cheat-sheet)

### Evidencia y testimonios

- [FeatBench](https://arxiv.org/abs/2509.22237)
- [FeatureBench](https://arxiv.org/abs/2602.10975)
- [PlanSearch](https://proceedings.iclr.cc/paper_files/paper/2025/hash/071a637d41ea290ac4360818a8323f33-Abstract-Conference.html)
- [CodePlan](https://www.microsoft.com/en-us/research/publication/codeplan-repository-level-coding-using-llms-and-planning-2/)
- [UTBoost](https://aclanthology.org/2025.acl-long.189/)
- [METR 2025](https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/)
- [METR 2026](https://metr.org/blog/2026-02-24-uplift-update/)
- [Vinicius Negrisolo, Hashrocket](https://hashrocket.com/blog/posts/openspec-vs-spec-kit-choosing-the-right-ai-driven-development-workflow-for-your-team)
- [Dan Clarke](https://www.danclarke.com/openspec/)
- [Apurv Sheth](https://apurvsheth.medium.com/how-openspec-actually-works-a-three-phase-workflow-that-keeps-ai-honest-3d4aeb61e9fa)
- [Issue #1141, ksanjeev9211](https://github.com/Fission-AI/OpenSpec/issues/1141)
