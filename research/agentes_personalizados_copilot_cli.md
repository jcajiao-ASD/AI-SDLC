# Agentes Personalizados en GitHub Copilot CLI

[<- volver al índice](_index.md)

> **Estado:** Vigente. Corte temporal: **21 de julio de 2026**.
>
> **Decisión:** sí conviene crear agentes personalizados, pero de forma
> **selectiva, medible y gobernada**. No se recomienda crear un agente por cada
> actividad del SDLC. Primero deben usarse instrucciones para reglas universales
> y skills para procedimientos reutilizables; un agente personalizado se
> justifica cuando además se necesita contexto aislado, una identidad
> especializada, permisos de herramientas propios o delegación.
>
> **Advertencia metodológica:** no existe un benchmark público que aísle el
> efecto de un agente personalizado de Copilot CLI frente al agente genérico con
> el mismo modelo, instrucciones y herramientas. La evidencia cuantitativa
> disponible proviene de sistemas multiagente, agentes especializados,
> benchmarks de ingeniería de software y estudios generales de asistencia con
> IA. Este documento no presenta esas cifras como si midieran directamente los
> agentes personalizados de Copilot CLI.

---

## Índice

1. [Objetivo y respuesta ejecutiva](#1-objetivo-y-respuesta-ejecutiva)
2. [Metodología y fuerza de la evidencia](#2-metodología-y-fuerza-de-la-evidencia)
3. [Qué es un agente personalizado](#3-qué-es-un-agente-personalizado)
4. [Qué problema resuelve cada mecanismo](#4-qué-problema-resuelve-cada-mecanismo)
5. [Beneficios esperables](#5-beneficios-esperables)
6. [Costos, riesgos y límites](#6-costos-riesgos-y-límites)
7. [Planes de GitHub y Microsoft](#7-planes-de-github-y-microsoft)
8. [Métricas y benchmarks](#8-métricas-y-benchmarks)
9. [Aplicación por actividad del SDLC](#9-aplicación-por-actividad-del-sdlc)
10. [Evaluación interna propuesta](#10-evaluación-interna-propuesta)
11. [Arquitectura y gobierno recomendados](#11-arquitectura-y-gobierno-recomendados)
12. [Recomendación final](#12-recomendación-final)
13. [Limitaciones y vigencia](#13-limitaciones-y-vigencia)
14. [Fuentes](#14-fuentes)

---

## 1. Objetivo y respuesta ejecutiva

La pregunta de decisión no es si Copilot CLI permite crear agentes
personalizados: la capacidad existe, está documentada y forma parte del producto
GA. La pregunta útil es si una organización obtiene suficiente valor adicional
al especializar el agente para desarrollo, pruebas, documentación, requisitos o
seguridad.

### Respuesta

**Sí, bajo tres condiciones:**

1. La tarea aparece con frecuencia y tiene un resultado verificable.
2. La especialización necesita algo más que instrucciones: contexto separado,
   herramientas o permisos diferentes, delegación o una identidad operativa
   estable.
3. El agente demuestra en una evaluación interna que supera al agente genérico
   y a una skill equivalente en calidad, tiempo, costo o riesgo.

**No conviene** construir de inmediato un catálogo grande de agentes. La
evidencia ofrece dos señales simultáneas:

- La especialización, la división de trabajo y los contextos aislados pueden
  mejorar tareas complejas [A1, A2, A3, A4, E1, E3].
- Una arquitectura más simple puede igualar o superar a agentes complejos, con
  menor costo [A5], y Anthropic advierte que muchas tareas de programación
  contienen menos trabajo paralelizable que una investigación abierta [E1].

Por ello, la recomendación es un piloto de **dos o tres agentes**, no una
transformación completa:

- analista de requisitos y especificaciones;
- especialista de pruebas;
- documentación técnica y ADR;
- seguridad solo si se requiere una política o toolchain distinta del agente
  `security-review` incorporado.

La investigación independiente reforzó esta cautela: señaló que el principal
punto ciego sería confundir resultados multiagente de investigación con
resultados de programación. En consecuencia, la propuesta exige comparar
también contra una skill y no solo contra el agente genérico.

## 2. Metodología y fuerza de la evidencia

La investigación prioriza fuentes primarias y separa hechos del producto,
resultados experimentales e inferencias.

| Nivel | Evidencia | Uso en este documento |
| --- | --- | --- |
| **Alta** | Documentación, referencia y changelog oficiales; paper revisado por pares con método y baseline identificables. | Definición, compatibilidad, configuración y resultados dentro del dominio evaluado. |
| **Media** | Estudio del proveedor, preprint reproducible, estudio cualitativo o benchmark pertinente pero no equivalente. | Señal para diseñar el piloto, siempre con sus límites. |
| **Baja** | Blog secundario, cifra sin metodología o extrapolación entre dominios. | Se excluye como sustento cuantitativo. |

Se buscaron deliberadamente benchmarks que compararan:

```text
Copilot CLI genérico + mismo modelo
              frente a
Copilot CLI + agente personalizado + mismo modelo
```

No se encontró una evaluación pública con ese aislamiento causal. Tampoco se
encontró un benchmark oficial por tipo de agente personalizado —requisitos,
documentación, pruebas o desarrollo— dentro del harness de Copilot CLI.

Las métricas generales de Copilot, SWE-bench o HumanEval se incluyen para
delimitar el contexto, no para atribuir al archivo `.agent.md` mejoras que no han
sido medidas.

## 3. Qué es un agente personalizado

GitHub define los **custom agents** como versiones especializadas del agente de
Copilot adaptadas a flujos, convenciones y casos de uso particulares [G1]. Se
declaran en perfiles Markdown con frontmatter YAML y permiten codificar una sola
vez:

- el rol y la descripción que orientan el enrutamiento;
- las instrucciones operativas;
- el modelo, o su herencia desde la sesión;
- las herramientas permitidas;
- servidores y herramientas MCP;
- si el agente puede seleccionarse manualmente o invocarse por el modelo.

### 3.1 Perfil mínimo

```markdown
---
name: requirements-analyst
description: Convierte solicitudes ambiguas en especificaciones verificables.
tools: ["read", "search", "edit"]
---

Analiza el contexto del repositorio y produce una especificación con:

- problema y alcance;
- supuestos y preguntas abiertas;
- requisitos funcionales y no funcionales;
- criterios de aceptación verificables;
- dependencias, riesgos y fuera de alcance.

No modifiques código de producción. Solo crea o actualiza documentación.
```

`description` es obligatorio. Si `tools` se omite, el agente obtiene por defecto
todas las herramientas disponibles, incluidas las de MCP; por seguridad, la
lista debe declararse de forma explícita [G2]. El prompt tiene un límite
documentado de 30.000 caracteres [G2].

El campo `infer` fue retirado. Los perfiles nuevos deben utilizar
`disable-model-invocation` y `user-invocable` [G2]. La referencia describe
`disable-model-invocation` específicamente para la invocación automática del
cloud agent; no debe asumirse sin una prueba de regresión que el mismo control
impide toda auto-delegación de la CLI.

La instrucción «solo documentación» del ejemplo guía al modelo, pero
`tools: ["edit"]` no limita por sí sola las rutas editables. Un hook debe
hacer cumplir esa restricción cuando sea un requisito de seguridad.

### 3.2 Ubicación y alcance

GitHub permite perfiles en varios niveles [G1, G2]:

| Alcance | Ubicación | Uso |
| --- | --- | --- |
| Repositorio | `.github/agents/AGENT-NAME.md` o `.agent.md` | Convenciones y herramientas del proyecto. |
| Organización | `/agents/AGENT-NAME.md` en `.github` o `.github-private` | Estándares compartidos por equipos. |
| Empresa | `/agents/AGENT-NAME.md` en el repositorio `.github-private` designado | Política transversal. |

El nombre del archivo se usa para deduplicar perfiles. La configuración más
específica prevalece: repositorio sobre organización y organización sobre
empresa [G2]. Esto facilita excepciones locales, pero también puede ocultar un
agente corporativo sin que el equipo lo advierta.

Los perfiles se versionan por SHA de Git. Una tarea conserva la versión del
perfil con la que fue iniciada, incluso durante sus interacciones posteriores en
el pull request [G2].

### 3.3 Invocación y relación con subagentes

En la CLI, el usuario puede seleccionar un perfil con `/agent`. El agente
principal también puede delegar a un agente personalizado elegible [G1, G3].

Un **agente personalizado** es la definición persistente; un **subagente** es una
ejecución delegada. Cuando Copilot ejecuta el perfil como subagente:

- obtiene una ventana de contexto separada;
- concentra allí la exploración o producción especializada;
- devuelve un resultado condensado al agente principal;
- puede ejecutarse en paralelo cuando la tarea realmente lo permite [G1, G3].

Copilot CLI también incluye agentes predefinidos como `explore`, `task`,
`general-purpose`, `code-review`, `research` y `rubber-duck` [G1]. Crear un
perfil que replique uno de ellos agrega mantenimiento sin valor, salvo que la
organización necesite herramientas, permisos, criterios o formatos distintos.

La selección de modelos para esos subagentes incorporados se desarrolla por
separado en [Configuración de Modelos para los Subagentes de GitHub Copilot CLI](configuracion_subagentes_copilot_cli.md)
[L1].

## 4. Qué problema resuelve cada mecanismo

GitHub documenta estas primitivas como mecanismos diferentes y combinables
[G3, G4]:

| Mecanismo | Responde a | Carga de contexto | Permisos propios | Capacidad externa |
| --- | --- | --- | :---: | :---: |
| **Custom instructions** | ¿Cómo debe comportarse Copilot siempre? | Siempre activa en su alcance. | No | No |
| **Prompt file** | ¿Qué prompt parametrizado quiero ejecutar una vez? | Manual y puntual; no está soportado en Copilot CLI a este corte. | No | No |
| **Agent skill** | ¿Cómo se ejecuta este procedimiento repetible? | Just-in-time. | No | Puede incluir scripts, pero usa las capacidades del agente. |
| **Custom agent** | ¿Qué especialista, enfoque y límites deben asumir esta tarea? | Contexto aislado al ejecutarse como subagente. | Sí | Puede seleccionar herramientas MCP. |
| **Subagent** | ¿Qué trabajo debe delegarse a otro proceso? | Contexto separado en runtime. | Según su perfil. | Según su perfil. |
| **MCP server** | ¿Qué sistema, dato o acción externa falta? | Expone herramientas. | Gobernado por herramientas y credenciales. | Sí |
| **Hook** | ¿Qué control debe ocurrir de manera determinista? | No depende del prompt. | Puede bloquear o modificar tool calls. | Ejecuta lógica propia. |
| **Plugin** | ¿Cómo se distribuye un paquete de customizaciones? | Depende de su contenido. | Puede incluir políticas. | Puede empaquetar MCP. |

### 4.1 Regla de selección

```text
Regla universal del repositorio
  -> custom instruction

Procedimiento repetible y carga bajo demanda
  -> skill

Prompt parametrizado de una sola ejecución
  -> prompt file fuera de CLI, donde la superficie lo soporte

Especialista con contexto o permisos propios
  -> custom agent

Acceso a Jira, observabilidad, base de datos u otra API
  -> MCP server

Control obligatorio, auditoría o bloqueo
  -> hook

Distribución de varias piezas como una unidad
  -> plugin
```

### 4.2 ¿Skills y MCP reemplazarán a los agentes?

**No hay evidencia oficial de reemplazo.** Las funciones no son equivalentes:

- una skill entrega instrucciones, recursos y scripts cuando la tarea la
  necesita;
- MCP entrega herramientas y datos externos;
- un agente define al especialista, su contexto y sus permisos;
- un plugin puede distribuir juntos agentes, skills, hooks y MCP.

La documentación vigente recomienda una skill como alternativa más ligera
cuando solo se necesita guía textual, y un custom agent cuando se necesitan
especialización y toolset restringido [G3]. El soporte de skills sigue un
estándar abierto y Copilot reconoce ubicaciones compatibles con otros productos
[G7, G8], pero esa portabilidad no elimina la capa de agentes.

## 5. Beneficios esperables

Los beneficios siguientes tienen diferente fuerza. Los cuatro primeros son
propiedades verificables del diseño; su magnitud económica debe medirse en cada
organización.

### 5.1 Consistencia y reutilización

El perfil evita repetir convenciones, criterios de aceptación, formatos y pasos
en cada prompt. Al vivir en Git:

- se revisa mediante pull request;
- se asocia a propietarios;
- se versiona y audita;
- se comparte entre CLI, GitHub.com e IDE compatibles [G2, G4, G9].

### 5.2 Separación de contexto

El subagente trabaja en una ventana separada y devuelve solo el resultado
relevante [G1, G3]. Esto puede evitar que una investigación extensa, logs o
documentos intermedios desplacen información útil del agente principal.

Anthropic describe el mismo patrón como una forma de compresión y separación de
responsabilidades en investigación multiagente [E1]. Microsoft encontró que el
aislamiento de memoria y subagentes contribuye a sostener tareas concurrentes en
CORPGEN [E3]. Ambos son sustentos indirectos, no mediciones de Copilot CLI.

### 5.3 Menor privilegio

Un agente de revisión puede limitarse a `read` y `search`; uno de documentación,
a editar solo el corpus permitido mediante instrucciones y hooks. Esta
separación reduce el radio de acción frente a conceder todas las herramientas al
agente genérico [G2, G3].

### 5.4 Especialización verificable

Un perfil puede exigir entregables que una persona o CI pueda evaluar:

- requisitos con criterios de aceptación;
- tests que fallen antes y pasen después;
- ADR con alternativas y consecuencias;
- revisión con severidad y evidencia;
- documentación con enlaces válidos y ejemplos ejecutables.

La especialización es más útil cuando define **contratos de salida** y
validadores, no cuando solo cambia el tono o asigna un título al agente.

### 5.5 Paralelización selectiva

Los subagentes pueden trabajar en paralelo sobre subtareas independientes [G1].
Anthropic reporta mejoras importantes de tiempo y cobertura en investigación
paralela [E1], pero advierte que la programación suele tener más dependencias y
menos ramas independientes. El beneficio debe reservarse para:

- explorar módulos no solapados;
- contrastar alternativas;
- ejecutar suites independientes;
- revisar desde criterios distintos;
- investigar fuentes separadas.

## 6. Costos, riesgos y límites

### 6.1 Costo de tokens y coordinación

En su sistema de investigación, Anthropic observó aproximadamente 4 veces más
tokens para agentes que para chat y 15 veces más para multiagente que para chat
[E1]. Son cifras de otro producto y dominio, pero demuestran que más agentes no
son capacidad gratuita.

La coordinación también puede producir:

- exploraciones duplicadas;
- handoffs incompletos;
- conflictos entre cambios;
- espera por el subagente más lento;
- pérdida de información al resumir resultados.

### 6.2 Seguridad y prompt injection

Un perfil sin `tools` explícito recibe todas las herramientas disponibles [G2].
La conexión con MCP amplía tanto la capacidad como la superficie de ataque.
Anthropic identifica la inyección de prompts como un riesgo que aumenta con
entornos abiertos y herramientas poderosas [S2]. OWASP clasifica, entre otros,
goal hijacking, tool misuse, identity abuse, memory poisoning y fallos en
cascada como riesgos de aplicaciones agénticas [S1].

Controles mínimos:

- declarar una allowlist de herramientas por agente;
- usar credenciales MCP con el menor alcance posible;
- requerir aprobación para efectos externos irreversibles;
- bloquear rutas y comandos mediante `preToolUse`;
- registrar `postToolUse`, `subagentStop` y `sessionEnd`;
- probar el agente con instrucciones maliciosas sembradas;
- no tratar las instrucciones naturales como un control determinista.

GitHub soporta hooks para guardrails y telemetría [G3, G6]. Microsoft también ha
publicado un toolkit de gobierno agéntico con políticas de runtime, identidad,
circuit breakers y auditoría [S3]; es evidencia de la dirección de gobierno del
ecosistema, no una integración automática con Copilot CLI.

### 6.3 Deriva y fragmentación

Un portafolio grande puede crear agentes solapados, instrucciones
contradictorias y perfiles abandonados. La precedencia de repositorio sobre
organización puede ocultar cambios corporativos [G2].

Cada agente debe tener:

- propietario;
- versión y changelog;
- casos de evaluación;
- fecha de última validación;
- criterio de retiro;
- ausencia de solapamiento con agentes incorporados y skills.

### 6.4 Falsa sensación de control

GitHub indica que nombres de herramientas no reconocidos se ignoran [G2]. Una
lista aparentemente restrictiva puede no expresar el control esperado si los
nombres son incorrectos. Debe validarse el inventario efectivo de tools y
confirmarse con hooks o pruebas negativas. La lista de tools es un filtro de
capacidades expuestas al modelo, no debe tratarse como sustituto de un sandbox
del sistema operativo.

### 6.5 No determinismo y mantenimiento

Cambios en el modelo, la CLI, el prompt, las herramientas o el repositorio
pueden alterar la conducta. La calidad del perfil no es una propiedad estática:
necesita regresiones igual que el software.

## 7. Planes de GitHub y Microsoft

### 7.1 Hechos publicados

| Fecha | Hecho | Lectura |
| --- | --- | --- |
| 28-oct-2025 | GitHub anunció custom agents para Copilot coding agent y Copilot CLI, con perfiles en repositorio u organización, tools y MCP [G5]. | Lanzamiento explícito de la primitiva. |
| 18-dic-2025 | GitHub añadió Agent Skills para coding agent, CLI y VS Code, con compatibilidad con `.claude/skills` [G7]. | Nueva capa portátil y complementaria. |
| 25-feb-2026 | Copilot CLI pasó a GA e incluyó en el anuncio agentes especializados, custom agents, MCP, plugins, skills y hooks [G6]. | Las capacidades coexistieron en el hito GA. |
| jul-2026 | La matriz oficial muestra custom agents, subagents, skills, hooks y MCP soportados en CLI [G4]. | Continúa la separación de responsabilidades. |

Los custom agents están soportados en Copilot CLI, GitHub.com, VS Code y Visual
Studio; algunas superficies de JetBrains, Eclipse y Xcode permanecen en preview
[G2, G4]. No todos los campos del perfil se comportan igual en todas las
superficies: `mcp-servers` y `metadata` no se usan en custom agents de IDE, y
algunos campos de IDE se ignoran en el cloud agent [G2].

### 7.2 Qué puede inferirse

**Inferencia de confianza media:** GitHub está construyendo una arquitectura
componible:

```text
instrucciones -> comportamiento global
skills        -> procedimiento portable
agentes       -> especialista y aislamiento
MCP           -> herramientas externas
hooks         -> control determinista
plugins       -> distribución
```

Esta lectura está respaldada por la comparación oficial [G3], la matriz [G4] y
el hecho de que plugins empaquetan agentes, skills, hooks y MCP [G6].

**Lo que no puede afirmarse:** GitHub y Microsoft no han publicado un compromiso
de permanencia indefinida ni un roadmap que garantice el formato actual. Tampoco
han anunciado que skills o MCP vayan a reemplazar los custom agents. Presentar
cualquiera de esas posibilidades como un plan confirmado sería especulación.

La evolución más plausible es convergencia de formatos, portabilidad y mejor
gobierno, no desaparición inmediata de la especialización. El retiro del campo
`infer`, sustituido por controles más precisos, muestra que el esquema sí puede
cambiar aunque la capacidad continúe [G2].

## 8. Métricas y benchmarks

### 8.1 Hallazgo principal

**No existe una métrica pública del ROI incremental de `.agent.md` en Copilot
CLI.** Las fuentes oficiales describen beneficios, ejemplos y controles, pero no
publican:

- tasa de éxito agente personalizado frente a genérico;
- reducción de tiempo por tipo de tarea;
- costo de AI Credits por perfil;
- precisión de auto-enrutamiento;
- efecto sobre defectos, retrabajo o calidad de PR;
- comparación agente personalizado frente a skill.

### 8.2 Evidencia académica y de sistemas comparables

| Estudio | Diseño y muestra | Resultado | Qué sustenta | Límite para esta decisión | Fuerza |
| --- | --- | --- | --- | --- | --- |
| **ChatDev**, ACL 2024 [A1] | Sistema por roles, GPT-3.5, 1.200 prompts de software; comparación con GPT-Engineer y MetaGPT bajo parámetros comunes. | Calidad compuesta `0,3953`, frente a `0,1419` de GPT-Engineer y `0,1523` de MetaGPT; ejecutabilidad `0,88`. | Roles, descomposición y ciclos de revisión pueden superar un baseline de una sola etapa. | Benchmark propio; la calidad multiplica completitud, ejecutabilidad y similitud semántica; modelos antiguos; no es Copilot CLI. | **Alta** por revisión de pares; **media-baja** para transferencia. |
| **MetaGPT**, ICLR 2024 [A2] | Roles y SOP; HumanEval, MBPP y SoftwareDev. | Pass@1 de `85,9 %` en HumanEval y `87,7 %` en MBPP. En SoftwareDev: ejecutabilidad `3,75/4`, revisión humana `0,83` y `124,3` tokens por línea funcional, frente a `2,25`, `2,5` y `248,9` de ChatDev. | SOP, artefactos intermedios y feedback ejecutable pueden mejorar coordinación. | Varias comparaciones son contra otro multiagente; benchmarks de función no representan mantenimiento de repositorios. | **Alta** en su dominio; **media** para transferencia. |
| **AgentCoder**, preprint [A3] | Programador, diseñador de tests y ejecutor; cuatro datasets, 14 LLM y 16 baselines. | Con GPT-4: `96,3 %` HumanEval y `91,8 %` MBPP, frente a GPT-4 zero-shot `67,6 %` y `68,3 %`; 56,9K y 66,3K tokens totales. | La separación test-generación-ejecución y el feedback pueden elevar pass@1. | Preprint; problemas de función; no aísla un archivo de agente ni trabajo humano real. | **Media**. |
| **MASAI**, preprint [A4] | Subagentes modulares con GPT-4o; 300 issues de 11 repositorios Python en SWE-bench Lite. | `28,33 %` de resolución; costo medio `USD 1,96` por issue. Aider obtuvo `26,33 %`; CodeR empató `28,33 %`. | Estrategias distintas por subproblema y localización separada pueden aportar valor en issues reales. | Resultado de 2024, benchmark Lite y sin comparación controlada contra el mismo agente genérico. | **Media**. |
| **Agentless**, preprint [A5] | Pipeline simple de localización, reparación y validación; SWE-bench Lite. | `32,00 %` (`96/300`) y costo medio `USD 0,70`, superior a los agentes open source comparados por los autores. | Un flujo simple y observable puede superar arquitecturas agénticas complejas. | Usa GPT-4o, múltiples muestras y un benchmark con problemas que los autores también documentan. | **Media**, como contraevidencia. |
| **Anthropic Research** [E1] | Orquestador Opus 4 y subagentes Sonnet 4 en evaluación interna de investigación web. | `90,2 %` mejor que Opus 4 de agente único; tokens explicaron `80 %` de la varianza; multiagente usó ~`15x` tokens frente a chat; paralelización redujo tiempo hasta `90 %`. | Contextos separados y ramas independientes pueden aumentar cobertura y velocidad. | Evaluación interna, no programación; el propio autor advierte que coding se paraleliza menos. | **Media** para esta decisión. |
| **CORPGEN**, Microsoft 2026 [E3] | Hasta 46 tareas empresariales concurrentes, sesiones de seis horas y tres backends. | A 46 tareas: `15,2 %` completadas frente a `4,3 %` de baselines (~`3,5x`); el aprendizaje elevó `8,7 %` a `15,2 %`. | Arquitectura, memoria y aislamiento pueden importar tanto como el modelo. | Trabajo de oficina, no Copilot ni ingeniería de software; tasas absolutas aún bajas. | **Media**. |

La evidencia no justifica la afirmación general «más agentes = mejor». ChatDev,
MetaGPT, AgentCoder y MASAI ofrecen señales favorables; Agentless demuestra que
la complejidad puede ser innecesaria. El factor decisivo es la adecuación entre
la estructura de la tarea y la arquitectura.

### 8.3 Métricas empresariales que no deben atribuirse a custom agents

| Fuente | Resultado | Por qué no prueba el valor de agentes personalizados |
| --- | --- | --- |
| RCT GitHub/Microsoft, 95 desarrolladores [E4] | Copilot completó una tarea de servidor HTTP `55 %` más rápido; 78 % frente a 70 % de finalización. | Evaluó asistencia de Copilot de 2022, no CLI, subagentes ni perfiles personalizados. |
| Estudio GitHub-Accenture [E5] | `8,69 %` más PR, `15 %` más merge rate y `84 %` más builds exitosos en el grupo con Copilot. | Estudio de adopción empresarial anterior a custom agents; mezcla telemetría y percepciones; patrocinado por proveedor y socio. |
| METR, early-2025 [E6] | 16 desarrolladores expertos y 246 tareas reales: la IA aumentó el tiempo `19 %`, aunque los participantes creían haber acelerado. | Herramientas y modelos de principios de 2025; METR declara el resultado desactualizado para 2026. |
| METR, actualización 2026 [E7] | 57 desarrolladores, 143 repositorios y más de 800 tareas; estimaciones sugieren aceleración, pero intervalos incluyen daño y METR las considera una señal débil por sesgo de selección. | No aísla agentes personalizados y no ofrece una estimación causal confiable actual. |
| Microsoft Research, 13 desarrolladores [E2] | Entrevistas reportan colaboración, productividad y seguridad, junto con complejidad y necesidad de transparencia y supervisión. | Estudio cualitativo de early adopters; no tiene efecto cuantitativo ni baseline. |

Estas divergencias son útiles: benchmarks, telemetría, percepción y tiempo real
responden preguntas distintas. Una evaluación propia debe combinar resultados
objetivos, costo y experiencia humana, siguiendo una visión multidimensional
como SPACE [M1].

## 9. Aplicación por actividad del SDLC

| Actividad | Primera opción | Cuándo escalar a custom agent | Recomendación |
| --- | --- | --- | --- |
| Convenciones de desarrollo | Instrucciones | Solo si una tecnología requiere toolset, modelo o contexto propios. | **No crear inicialmente** un agente genérico de desarrollo. |
| Implementación especializada | Skill | Framework, dominio o permisos claramente distintos; delegación frecuente. | Pilotar después de requisitos y tests. |
| Requisitos y especificaciones | Skill en CLI; prompt file solo en una superficie compatible | Investigación separada, artefacto formal, handoff y restricción de no editar código. | **Piloto prioritario:** `requirements-analyst`. |
| Documentación y ADR | Skill | Corpus amplio, verificación de enlaces/ejemplos y edición restringida a docs. | **Piloto condicionado:** agente si el contexto aislado reduce errores; si no, conservar skill. |
| Generación de pruebas | Skill | Ciclo autónomo de crear-ejecutar-diagnosticar con permiso de editar solo tests. | **Piloto prioritario:** `test-specialist`. |
| Code review | Agente incorporado `code-review` | Reglas de dominio o checks internos no cubiertos. | No duplicar el agente incorporado sin evidencia. |
| Seguridad | Agente incorporado `security-review` + herramientas existentes | Toolchain propia, checklist regulatorio, MCP o formato obligatorio. | Custom agent de solo lectura/ejecución, nunca sustituto de SAST, CI o revisión humana. |
| Investigación | Agente incorporado `research` | Corpus interno o fuentes y salida reguladas. | Extender solo si hay requisitos organizacionales. |
| Releases e incidentes | Skill + MCP | Contexto aislado, credenciales y permisos específicos, múltiples fuentes. | Buen candidato posterior, con hooks y aprobación humana. |

### 9.1 Portafolio piloto

**1. `requirements-analyst`**

- invocado explícitamente con `/agent` durante el piloto, registrando cualquier
  auto-delegación;
- `read`, `search` y edición limitada a documentación;
- produce especificación, criterios de aceptación y riesgos;
- no modifica código;
- evaluación mediante rúbrica y trazabilidad requisito-test.

**2. `test-specialist`**

- lee producción, edita tests y ejecuta comandos de test;
- no cambia código de producción sin autorización explícita;
- mide mutation score si el proyecto ya dispone de la herramienta;
- informa tests frágiles, no solo cobertura.

**3. `docs-adr`**

- se prueba primero como skill;
- se promueve a agente solo si el contexto separado o permisos reducidos
  demuestran una mejora;
- valida enlaces, comandos y consistencia con el código.

**4. `security-audit`, condicionado**

- crear únicamente si añade checks organizacionales a `security-review`;
- toolset allowlisted, sin capacidad de editar;
- hallazgos con evidencia, severidad, propietario y comando de reproducción;
- todo hallazgo crítico requiere validación humana.

## 10. Evaluación interna propuesta

### 10.1 Pregunta causal

El experimento debe separar el valor de la especialización del valor del modelo,
las instrucciones y las herramientas.

| Brazo | Configuración |
| --- | --- |
| **A — Control** | Copilot CLI genérico + instrucciones mínimas del repositorio. |
| **B — Skill** | Mismo modelo y configuración de A + skill específica. |
| **C — Custom agent** | Mismo modelo y contenido operativo equivalente, ejecutado como agente con contexto y permisos propios. |
| **D — MCP, opcional** | C + MCP; solo para tareas que realmente requieren el sistema externo. |

Comparar únicamente A contra C atribuiría al agente ventajas que una skill más
barata podría entregar. D debe aislarse porque una mejora podría provenir de la
herramienta externa, no del agente.

### 10.2 Diseño

1. Seleccionar tareas reales ya resueltas o golden tasks con resultado conocido.
2. Estratificar por actividad, repositorio y dificultad.
3. Asignar aleatoriamente cada tarea a los brazos y usar clones independientes.
4. Fijar modelo, nivel de esfuerzo, versión de CLI, instrucciones y límite de
   recursos.
5. Iniciar sesiones limpias para evitar memoria o contaminación entre brazos.
6. Repetir cada tarea automatizable al menos tres veces para observar varianza.
7. Cegar a quien califica respecto del brazo usado.
8. Predefinir hipótesis, métrica primaria y umbral antes de observar resultados.

Un screening puede comenzar con 10 tareas por caso de uso para encontrar fallos
gruesos. El piloto debe aspirar al menos a 30 tareas pareadas por caso de uso; el
tamaño final debe calcularse con la varianza observada y el efecto mínimo que la
organización considera valioso. No existe un tamaño universal.

### 10.3 Métricas

| Dimensión | Métricas recomendadas |
| --- | --- |
| **Resultado** | pass@1 de CI; criterios de aceptación cumplidos; precisión y recall de hallazgos; rúbrica de requisitos/docs; defectos escapados. |
| **Calidad** | revisión humana ciega; complejidad; tests útiles; mutation score existente; factualidad; adherencia arquitectónica. |
| **Proceso** | tiempo de reloj y tiempo humano activo; iteraciones hasta verde; tool calls; reintentos; cambios revertidos. |
| **Costo** | AI Credits o tokens por tarea aceptada; costo por defecto detectado; costo de revisión y mantenimiento del perfil. |
| **Contexto** | tamaño de entrada/salida; compacciones; duplicación entre agentes; información perdida en handoff. |
| **Riesgo** | acciones bloqueadas; accesos fuera de alcance; secretos expuestos; éxito de prompt injection; falsos positivos de seguridad. |
| **Experiencia** | dimensiones SPACE: satisfacción, desempeño percibido, actividad, comunicación y eficiencia/flujo [M1]. |
| **Entrega** | lead time, change failure rate y retrabajo, solo después de acumular suficiente señal a nivel de equipo. |

No usar líneas de código, número bruto de PR o cobertura aislada como métrica
primaria. Pueden aumentar mientras la calidad o el tiempo de revisión empeoran.

### 10.4 Instrumentación

- hash del perfil, skill e instrucciones;
- versión de CLI y modelo;
- eventos `preToolUse`, `postToolUse`, `subagentStop` y `sessionEnd`;
- duración, tool calls, comandos, resultado de CI y AI Credits;
- diff final y evaluación humana;
- incidentes de permisos y pruebas adversariales.

Los logs deben evitar código sensible, prompts privados y secretos. La retención
y el acceso deben ajustarse a la política de la organización.

### 10.5 Criterios de decisión

Los siguientes son umbrales de ejemplo, no benchmarks de industria:

- **Promover a agente:** C supera a B en la métrica primaria con efecto
  operacional relevante, o mantiene calidad pero reduce de forma clara riesgo o
  tiempo humano gracias al aislamiento y permisos.
- **Conservar como skill:** B y C tienen calidad equivalente y B consume menos
  tiempo, créditos y mantenimiento.
- **Conservar genérico:** A no es inferior de forma relevante.
- **Retirar o rediseñar:** aumenta defectos, permisos indebidos, retrabajo o
  costo sin beneficio compensatorio.

La decisión debe considerar intervalos de confianza y distribución, no solo el
promedio. Un agente que mejora tareas fáciles pero falla de forma grave en tareas
críticas no debe aprobarse por media agregada.

## 11. Arquitectura y gobierno recomendados

### 11.1 Capas

```text
Organización
  instrucciones comunes y agentes aprobados
        |
Repositorio
  excepciones explícitas, skills y evaluaciones
        |
Custom agent
  rol + contrato de salida + allowlist de tools
        |
MCP
  capacidad externa con identidad mínima
        |
Hooks
  política determinista + telemetría
        |
CI y revisión humana
  verificación independiente del agente
```

### 11.2 Estándar de un perfil

Cada agente debe documentar:

1. problema y tareas para las que sí aplica;
2. tareas fuera de alcance;
3. entradas y contrato de salida;
4. tools y MCP permitidos;
5. modelo y razón para heredarlo o fijarlo;
6. reglas de stop, escalamiento y aprobación;
7. validadores y suite de regresión;
8. propietario, versión, fecha de revisión y criterio de retiro.

### 11.3 Principios de gobierno

- **Base mínima:** no repetir reglas universales dentro de cada agente.
- **Menor privilegio:** nunca omitir `tools` por comodidad en agentes
  organizacionales.
- **Una responsabilidad:** evitar perfiles «arquitecto-desarrollador-tester-
  reviewer» que recrean al agente genérico.
- **Verificación externa:** CI, linters, SAST y revisores no deben depender del
  mismo prompt que produce el cambio.
- **Fallback explícito:** si falta información o una herramienta, el agente debe
  reportar el bloqueo, no inventar una salida exitosa.
- **Evaluación continua:** ejecutar regresiones al cambiar perfil, modelo,
  toolchain o versión de CLI.
- **Retiro activo:** eliminar agentes sin uso, sin propietario o sin beneficio
  medido.

## 12. Recomendación final

La organización debe **adoptar agentes personalizados como una capa de
especialización, no como la unidad predeterminada de todo trabajo**.

Plan recomendado:

1. Consolidar primero las instrucciones comunes del repositorio.
2. Convertir procedimientos repetibles en skills.
3. Pilotar `requirements-analyst` y `test-specialist`.
4. Comparar `docs-adr` como skill y como agente.
5. Reutilizar `code-review`, `research` y `security-review` antes de crear
   duplicados.
6. Crear agentes de seguridad, release o incidentes solo cuando requieran
   permisos, herramientas o contexto propios.
7. Medir A/B/C por tarea y promover únicamente perfiles que superen a la skill
   equivalente.
8. Revisar trimestralmente el catálogo, o ante cambios de CLI, modelo o esquema.

Esta decisión captura el beneficio más defendible —consistencia, aislamiento y
menor privilegio— sin asumir un ROI que todavía no ha sido publicado. También
preserva una salida simple: cuando una skill obtiene el mismo resultado, no se
justifica pagar la coordinación y el mantenimiento de un agente.

## 13. Limitaciones y vigencia

1. **Ausencia de benchmark directo:** es el mayor vacío de evidencia.
2. **Evidencia envejecida:** varios papers usan GPT-3.5, GPT-4 o GPT-4o y
   representan arquitecturas de 2023-2024.
3. **Benchmarks no equivalentes:** HumanEval mide funciones; SWE-bench mide
   issues; ninguno mide por sí solo requisitos, documentación o desempeño de
   equipos.
4. **Datos de proveedor:** GitHub, Microsoft y Anthropic describen sus propios
   productos; se contrastaron con papers y contraevidencia, pero sigue existiendo
   conflicto de interés.
5. **Superficies distintas:** GitHub.com, CLI e IDE no soportan exactamente los
   mismos campos [G2, G4].
6. **Catálogo dinámico:** modelos, herramientas, comandos y esquemas cambian.
7. **No generalización automática:** el resultado depende del repositorio,
   claridad de requisitos, calidad de tests, experiencia del equipo y
   gobernanza.

**Revalidación:** trimestral y cada vez que GitHub cambie el esquema de perfiles,
la matriz de compatibilidad, el sistema de AI Credits o la ejecución de
subagentes.

## 14. Fuentes

### 14.1 GitHub y Microsoft: producto

- **[G1]** GitHub Docs, [About custom agents](https://docs.github.com/en/copilot/concepts/agents/copilot-cli/about-custom-agents):
  definición, perfiles, agentes incorporados y ejecución como subagentes.
- **[G2]** GitHub Docs, [Custom agents configuration](https://docs.github.com/en/copilot/reference/custom-agents-configuration):
  frontmatter, tools, MCP, precedencia, versionado y diferencias entre
  superficies.
- **[G3]** GitHub Docs, [Comparing GitHub Copilot CLI customization features](https://docs.github.com/en/copilot/concepts/agents/copilot-cli/comparing-cli-features):
  instrucciones, skills, tools, MCP, hooks, subagents, custom agents y plugins.
- **[G4]** GitHub Docs, [Copilot customization cheat sheet](https://docs.github.com/en/copilot/reference/customization-cheat-sheet):
  selección y matriz de compatibilidad.
- **[G5]** GitHub Changelog, 28-oct-2025,
  [Custom agents for GitHub Copilot](https://github.blog/changelog/2025-10-28-custom-agents-for-github-copilot/).
- **[G6]** GitHub Changelog, 25-feb-2026,
  [GitHub Copilot CLI is now generally available](https://github.blog/changelog/2026-02-25-github-copilot-cli-is-now-generally-available/).
- **[G7]** GitHub Changelog, 18-dic-2025,
  [GitHub Copilot now supports Agent Skills](https://github.blog/changelog/2025-12-18-github-copilot-now-supports-agent-skills/).
- **[G8]** GitHub Docs, [About agent skills](https://docs.github.com/en/copilot/concepts/agents/about-agent-skills):
  estándar abierto, ubicaciones y superficies.
- **[G9]** GitHub Blog,
  [From one-off prompts to workflows: How to use custom agents in GitHub Copilot CLI](https://github.blog/ai-and-ml/github-copilot/from-one-off-prompts-to-workflows-how-to-use-custom-agents-in-github-copilot-cli/):
  guía oficial, ejemplos y prácticas.
- GitHub, [awesome-copilot: custom agents](https://github.com/github/awesome-copilot/tree/main/agents):
  colección de ejemplos; la calidad de perfiles individuales es variable.

### 14.2 Literatura académica

- **[A1]** Qian et al., [ChatDev: Communicative Agents for Software Development](https://aclanthology.org/2024.acl-long.810/),
  ACL 2024, DOI `10.18653/v1/2024.acl-long.810`.
- **[A2]** Hong et al., [MetaGPT: Meta Programming for A Multi-Agent Collaborative Framework](https://arxiv.org/abs/2308.00352),
  ICLR 2024.
- **[A3]** Huang et al., [AgentCoder: Multi-Agent-based Code Generation with Iterative Testing and Optimisation](https://arxiv.org/abs/2312.13010),
  preprint arXiv, versión 3 de mayo de 2024.
- **[A4]** Arora et al., [MASAI: Modular Architecture for Software-engineering AI Agents](https://arxiv.org/abs/2406.11638),
  preprint arXiv, junio de 2024.
- **[A5]** Xia et al., [Agentless: Demystifying LLM-based Software Engineering Agents](https://arxiv.org/abs/2407.01489),
  preprint arXiv, versión 2 de octubre de 2024.
- **[A6]** Guo et al.,
  [Large Language Model Based Multi-agents: A Survey of Progress and Challenges](https://www.ijcai.org/proceedings/2024/890),
  IJCAI 2024.

### 14.3 Evidencia empresarial y figuras de autoridad

- **[E1]** Anthropic Engineering,
  [How we built our multi-agent research system](https://www.anthropic.com/engineering/multi-agent-research-system),
  junio de 2025.
- **[E2]** Microsoft Research,
  [Designing with Multi-Agent Generative AI: Insights from Industry Early Adopters](https://www.microsoft.com/en-us/research/publication/designing-with-multi-agent-generative-ai-insights-from-industry-early-adopters/),
  estudio cualitativo con 13 desarrolladores, DIS 2025.
- **[E3]** Microsoft Research,
  [CORPGEN advances AI agents for real work](https://www.microsoft.com/en-us/research/blog/corpgen-advances-ai-agents-for-real-work/),
  febrero de 2026.
- **[E4]** GitHub/Microsoft,
  [Research: quantifying GitHub Copilot's impact on developer productivity and happiness](https://github.blog/news-insights/research/research-quantifying-github-copilots-impact-on-developer-productivity-and-happiness/),
  experimento controlado; paper asociado:
  [The Impact of AI on Developer Productivity](https://www.microsoft.com/en-us/research/publication/the-impact-of-ai-on-developer-productivity-evidence-from-github-copilot/).
- **[E5]** GitHub y Accenture,
  [Research: Quantifying GitHub Copilot's impact in the enterprise with Accenture](https://github.blog/news-insights/research/research-quantifying-github-copilots-impact-in-the-enterprise-with-accenture/).
- **[E6]** METR,
  [Measuring the Impact of Early-2025 AI on Experienced Open-Source Developer Productivity](https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/),
  estudio aleatorizado y advertencia de desactualización.
- **[E7]** METR,
  [Uplift Update](https://metr.org/blog/2026-02-24-uplift-update/),
  febrero de 2026.
- Birgitta Böckeler, Thoughtworks/Martin Fowler,
  [Autonomous coding agents: A Codex example](https://martinfowler.com/articles/exploring-gen-ai/autonomous-agents-codex-example.html):
  observación cualitativa y trazas de un agente autónomo; no se usa como
  benchmark.

### 14.4 Seguridad y medición

- **[S1]** OWASP,
  [Top 10 for Agentic Applications 2026](https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/).
- **[S2]** Anthropic,
  [Trustworthy agents in practice](https://www.anthropic.com/research/trustworthy-agents):
  control humano, permisos, transparencia, privacidad e inyección de prompts.
- **[S3]** Microsoft Open Source,
  [Introducing the Agent Governance Toolkit](https://opensource.microsoft.com/blog/2026/04/02/introducing-the-agent-governance-toolkit-open-source-runtime-security-for-ai-agents/),
  abril de 2026.
- **[M1]** Forsgren et al.,
  [The SPACE of Developer Productivity](https://queue.acm.org/detail.cfm?id=3454124),
  ACM Queue, 2021.

### 14.5 Documento local relacionado

- **[L1]** [Configuración de Modelos para los Subagentes de GitHub Copilot CLI](configuracion_subagentes_copilot_cli.md):
  modelos, esfuerzo, contexto, escalamiento y limitaciones por subagente.
