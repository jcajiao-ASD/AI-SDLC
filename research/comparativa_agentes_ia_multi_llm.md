---
id: comparativa-agentes-ia-multi-llm
title: "Comparativa de Agentes de IA para Codificación con Planes Multi-LLM"
slug: comparativa-agentes-ia-multi-llm
summary: "Compara Copilot CLI, Cursor CLI, Junie CLI y OpenCode por modelos, harness, integración, apertura y coste."
category: agentes
status: vigente
cutoffDate: "2026-07-20"
revalidateAfter: "2027-01-20"
evidenceLevel: mixta
decisionType: comparacion-agentes
role: catalog
---

# Comparativa de Agentes de IA para Codificación con Planes Multi-LLM

[<- back](_index.md)

> **Estado:** Vigente. Investigación con corte a **mediados de julio de 2026**.
> **Alcance:** Agentes de línea de comandos (CLI) *agnósticos de proveedor*
> (multi-LLM): **GitHub Copilot CLI**, **Cursor CLI**, **Junie CLI (JetBrains)** y
> **OpenCode**. Se excluyen deliberadamente los agentes atados a un único
> proveedor (p. ej. **Claude Code** → solo Anthropic; **Codex CLI** → solo OpenAI),
> que solo se usan como *línea de referencia* de rendimiento.
> **Foco de la pregunta:** ¿qué tan bueno es **Copilot CLI** frente a los otros
> tres como agente de codificación?

---

## Índice

1. [Objetivo y alcance](#1-objetivo-y-alcance)
2. [Metodología y fuentes](#2-metodología-y-fuentes)
3. [Conceptos clave: harness vs. modelo y benchmarks](#3-conceptos-clave-harness-vs-modelo-y-benchmarks)
4. [Los cuatro agentes multi-LLM en detalle](#4-los-cuatro-agentes-multi-llm-en-detalle)
   - [4.1 GitHub Copilot CLI](#41-github-copilot-cli)
   - [4.2 Cursor CLI](#42-cursor-cli)
   - [4.3 Junie CLI (JetBrains)](#43-junie-cli-jetbrains)
   - [4.4 OpenCode](#44-opencode)
5. [Comparativa de rendimiento (benchmarks)](#5-comparativa-de-rendimiento-benchmarks)
6. [Comparativa de soporte multi-LLM](#6-comparativa-de-soporte-multi-llm)
7. [Comparativa de precios](#7-comparativa-de-precios)
8. [Matriz de capacidades y autonomía](#8-matriz-de-capacidades-y-autonomía)
9. [Análisis enfocado: ¿qué tan bueno es Copilot CLI?](#9-análisis-enfocado-qué-tan-bueno-es-copilot-cli)
10. [Conclusiones y recomendaciones](#10-conclusiones-y-recomendaciones)
11. [Nota sobre la fiabilidad de los datos](#11-nota-sobre-la-fiabilidad-de-los-datos)
12. [Referencias](#12-referencias)

---

## 1. Objetivo y alcance

Este documento responde a una pregunta concreta: **entre los agentes de
codificación que soportan múltiples LLM, ¿qué posición ocupa GitHub Copilot CLI
frente a Cursor CLI, Junie CLI y OpenCode?**

El criterio de selección es que los cuatro son **multi-LLM**: permiten elegir o
enchufar distintos modelos (Anthropic, OpenAI, Google, etc.), a diferencia de
agentes mono-proveedor como Claude Code (solo Anthropic) o Codex CLI (solo
OpenAI) [11][12]. Esta característica es decisiva para equipos que quieren evitar
el *vendor lock-in*, optimizar costo/latencia por tarea o cumplir requisitos de
residencia de datos.

El análisis cubre cinco ejes: **rendimiento en benchmarks**, **soporte multi-LLM
/ BYOK**, **precio**, **capacidades agénticas** y **experiencia de desarrollo
(DX)**.

## 2. Metodología y fuentes

La información se recopiló mediante investigación web con corte a **mediados de
julio de 2026**, combinando tres tipos de fuentes, ordenadas por fiabilidad:

1. **Leaderboards y benchmarks auditables** — Terminal-Bench [1], SWE-bench
   Verified/Pro [2][39] y agregadores como Artificial Analysis [5].
2. **Documentación y anuncios oficiales** — GitHub Copilot Docs y changelogs
   [12][13][14][18][19], blog de Cursor [20], blog de JetBrains/Junie [24][25],
   sitio de OpenCode [33].
3. **Comparativas y reseñas independientes de 2026** — Morph LLM [4][6][7],
   Codersera [8], DevToolLab [9][10], Faros AI [11], NxCode [36][37], entre otras.

Cada dato relevante se referencia en línea con la notación `[n]`, resuelta en la
sección [Referencias](#12-referencias). Las limitaciones de estos datos se
discuten explícitamente en la sección [11](#11-nota-sobre-la-fiabilidad-de-los-datos).

## 3. Conceptos clave: harness vs. modelo y benchmarks

Para interpretar correctamente la comparación hay que separar dos capas:

- **El modelo (LLM):** el "cerebro" (p. ej. GPT-5.5, Claude Opus 4.8, Gemini 3.1
  Pro). Aporta el razonamiento base.
- **El harness (agente):** el andamiaje que rodea al modelo — bucle de
  herramientas, gestión de contexto, ejecución de comandos, edición de ficheros,
  recuperación de errores y modos de planificación. Copilot CLI, Cursor CLI,
  Junie CLI y OpenCode **son harnesses**.

**Consecuencia central:** para un agente multi-LLM, el resultado observado es
`rendimiento ≈ calidad_del_harness × calidad_del_modelo_elegido`. Por eso un mismo
modelo puede puntuar muy distinto según el harness que lo envuelva [1][35].

**Benchmarks usados en este documento:**

| Benchmark | Qué mide | Relevancia para CLI |
| --- | --- | --- |
| **Terminal-Bench 2.x** | Autonomía en una terminal real: compilar, configurar, DevOps, recuperar de errores | La más directa para agentes CLI [1][35] |
| **SWE-bench Verified** | Resolver *issues* reales de GitHub (subconjunto revisado por humanos) | Estándar de oro para parcheo de código [2][39] |
| **SWE-bench Pro** | Variante más difícil de SWE-bench | Discrimina mejor en la gama alta [4] |
| **SWE-Rebench** | Benchmark agéntico independiente y rotativo | Usado por JetBrains para Junie [26][27] |

## 4. Los cuatro agentes multi-LLM en detalle

### 4.1 GitHub Copilot CLI

- **Fabricante:** GitHub (Microsoft). Alcanzó disponibilidad general (GA) en
  **marzo de 2026** [17].
- **Modelos soportados (jul 2026):** conmutables desde la terminal con `/model`
  [15]:
  - **Anthropic Claude:** Sonnet 4.5 / 4.6 / 5, Opus 4.6 / 4.8, Fable 5, Haiku 4.5
    (incl. modos ZDR y "fast") [14][18].
  - **OpenAI GPT:** GPT-5 mini, GPT-5.3 Codex, GPT-5.4, GPT-5.5, GPT-5.6 (Luna /
    Sol / Terra) [15][19].
  - **Google Gemini:** 2.5 Pro, 3 Flash, 3.1 Pro, 3.5 Flash [14].
  - **Otros:** MAI-Code-1-Flash, Kimi K2.7, entre otros [15].
- **Capacidades agénticas:** modo **Plan** (propone un plan revisable antes de
  ejecutar), modo **Autopilot** (ejecución autónoma para tareas de confianza),
  **agentes especializados** (Task, Explore, Review, Plan), **delegación en
  segundo plano** (tareas en la nube) y **ejecución paralela / fleet** para
  operaciones multi-repo [16][17]. Ventana de contexto de hasta ~1M de tokens con
  los modelos superiores.
- **Integración:** la más fuerte del ecosistema GitHub — flujo *issue → PR*,
  revisión de PRs, resúmenes de diffs, políticas por organización, ZDR y auditoría
  para empresa [7][17].
- **BYOK:** limitado; se opera principalmente sobre el **catálogo de modelos de
  GitHub**, no con claves de proveedor arbitrarias [11].

### 4.2 Cursor CLI

- **Fabricante:** Anysphere (creadores de la IDE Cursor).
- **Modelo propio + multi-LLM:** modelo **Composer 2.5** (lanzado mayo 2026, con
  base abierta Kimi K2.5 + RL específico de Cursor) y un *model picker* que permite
  usar además **Claude (Fable 5, Opus 4.8, Sonnet 5)**, **GPT-5.6 (Sol/Terra/Luna)**
  y **Gemini 3.x (3.1 Pro / 3.5 Flash)**, entre otros, con **BYOK** [21][23]
  (catálogo oficial verificado el 20-jul-2026:
  <https://cursor.com/es/docs/models-and-pricing>).
- **Benchmarks:** Composer 2.5 obtiene **79.8 % en SWE-bench Multilingual**
  (paridad cercana con Opus 4.7 a ~1/10 del costo por token) [22]; **61.7 en
  Terminal-Bench 2.0** [21]. En comparativas de harness CLI se sitúa ~70–74 %
  [11].
- **Capacidades:** *cloud agents* en VMs aisladas, **agentes paralelos**
  (subagentes), integración nativa con Jira, operación autónoma multi-fichero y
  ventana de contexto de **200 000 tokens** [21][23].
- **BYOK:** sí.

### 4.3 Junie CLI (JetBrains)

- **Fabricante:** JetBrains. La **CLI entró en beta en marzo de 2026** [25] y
  **salió de beta (GA) en junio de 2026** [24]; se ejecuta de forma **autónoma en
  cualquier terminal/CI**, sin requerir una IDE de JetBrains abierta [30].
- **Modelos soportados:** diseño **LLM-agnóstico** — OpenAI, Anthropic, Google,
  Grok y otros; además **modelos locales** y **cientos de modelos vía BYOK /
  OpenRouter** [25][32]. Permite asignar modelos distintos por tipo de tarea [24].
  Su **catálogo nativo** (JetBrains AI) ya incluye **Claude Fable 5, Sonnet 5,
  Opus 4.8 y Gemini 3.1 Pro / 3.5 Flash**; el máximo de OpenAI **nativo** es
  **GPT-5.5**, por lo que **GPT-5.6 se accede vía BYOK/OpenRouter** (verificado el
  20-jul-2026: <https://www.jetbrains.com/help/ai-assistant/supported-llms.html>).
- **Benchmarks:** **líder en la ejecución pública de SWE-Rebench** con **61.6 % de
  tareas resueltas** y **72.7 % de pass@5** [26]. En Terminal-Bench queda por
  debajo de Codex CLI en el ciclo reciente; su fuerte es la integración con las
  herramientas de análisis de JetBrains [28][29].
- **Capacidades:** **modo Plan** (planifica antes de codificar), integración
  profunda con depuradores e inspecciones de JetBrains, seguimiento y revisión de
  todas las acciones de código [24][27].
- **BYOK:** sí, amplio (a nivel CLI y de organización) [30].

### 4.4 OpenCode

- **Fabricante:** proyecto **open source** de la comunidad, licencia **MIT**;
  ~180 000 estrellas en GitHub a jul 2026 [33][34].
- **Modelos soportados:** **más de 75 proveedores** — Anthropic, OpenAI, Google,
  Mistral, Zhipu GLM, Grok y **modelos locales** vía Ollama, LM Studio y
  llama.cpp; **BYOK total** por JSON de configuración; proveedor "Zen" con
  emparejamientos curados; además **OAuth con Copilot/ChatGPT** para reutilizar
  suscripciones existentes [33][34][10].
- **Benchmarks:** en **Terminal-Bench 2.1** ronda **75–78 %**, dependiendo del
  modelo emparejado; es el agente open source mejor rankeado [4][9].
- **Capacidades:** TUI de terminal, app de escritorio y extensión de IDE;
  **multi-agente / multi-sesión**, **LSP integrado**, modos **Plan/Build**,
  compartición de sesión y enfoque **local-first / privacidad** (no almacena
  código por defecto) [33][34].
- **BYOK:** total; es su rasgo distintivo.

## 5. Comparativa de rendimiento (benchmarks)

Puntuaciones con corte a jul 2026. Recuérdese que, al ser harnesses multi-LLM, el
número final depende del modelo emparejado (ver [sección 3](#3-conceptos-clave-harness-vs-modelo-y-benchmarks)).

| Agente (multi-LLM) | Terminal-Bench 2.x | SWE-bench | Fuente |
| --- | --- | --- | --- |
| **OpenCode** | ~75–78 % (según modelo) | Depende del modelo | [4][9] |
| **Cursor CLI** | ~70–74 % (Composer 2.5: 61.7 en TB 2.0) | **79.8 % SWE-bench Multilingual** (Composer 2.5) | [11][21][22] |
| **Copilot CLI** | ~68–72 % (según modelo) | ~86 % Verified (con modelo superior, aprox.) | [11][36] |
| **Junie CLI** | Por debajo de Codex en TB | **SWE-Rebench: 61.6 % resuelto / 72.7 % pass@5 (líder)** | [26][29] |

**Línea de referencia (agentes mono-proveedor, fuera del alcance):**

| Agente de referencia | Terminal-Bench 2.1 | SWE-bench Verified | SWE-bench Pro |
| --- | --- | --- | --- |
| **Codex CLI** (GPT-5.5) | **83.4 %** | ~80–87 % (modelo) | 58.6 % |
| **Claude Code** (Fable 5) | 83.1 % | **95.0 %** | **80.3 %** |
| **Claude Code** (Opus 4.8) | 78.9 % | 88.6 % | 69.2 % |

Fuentes de la línea de referencia: [3][4][5][39].

**Lectura:** ningún agente multi-LLM alcanza aún el techo de los mono-proveedor
punteros en Terminal-Bench. Entre los cuatro del estudio, **OpenCode y Cursor CLI
lideran en benchmark puro de terminal**, **Junie destaca en SWE-Rebench**, y
**Copilot CLI queda ligeramente por detrás en score bruto** [4][11][26][38].

## 6. Comparativa de soporte multi-LLM

| | Modelos soportados | BYOK | Modelos locales | Apertura |
| --- | --- | --- | --- | --- |
| **Copilot CLI** | Claude, GPT-5.x, Gemini 3/3.5, otros (catálogo GitHub) | Limitado | No | Cerrado |
| **Cursor CLI** | Composer propio + Claude, GPT, Gemini, DeepSeek | Sí | Parcial | Cerrado |
| **Junie CLI** | OpenAI, Anthropic, Google, Grok + OpenRouter | Sí (amplio) | Sí | Cerrado |
| **OpenCode** | **75+ proveedores** | **Total** | **Sí (Ollama, LM Studio, llama.cpp)** | **Open source (MIT)** |

Fuentes: [10][14][15][25][32][33][34].

**Lectura:** en el eje que motiva esta comparación —ser multi-LLM—, **OpenCode y
Junie CLI son los más agnósticos** (BYOK real, sin *lock-in*, modelos locales).
**Cursor** ofrece BYOK con un modelo propio competitivo. **Copilot CLI** permite
conmutar modelos con comodidad, pero **dentro del catálogo de GitHub**, con BYOK
más restringido [11][15][40].

## 7. Comparativa de precios

| Agente | Precio de entrada | Modelo de costo | Fuente |
| --- | --- | --- | --- |
| **Copilot CLI** | Free / **$10** Pro / **$39** Pro+ | *Premium requests* (50 / 300 / 1 500 al mes); crédito extra ~$0.01 | [36][37] |
| **Cursor CLI** | **$20** Pro / $40 Ultra / **$200** Max | Créditos + BYOK por token (Composer 2.5 estándar: $0.50/M in, $2.50/M out) | [21][23] |
| **Junie CLI** | AI Pro **$100/año** / Ultimate **$300/año** / Enterprise $720/año **+ licencia IDE** (~$289/año) | Créditos (10–35/mes); **BYOK evita la suscripción** | [26][30][31] |
| **OpenCode** | **Gratis** (MIT) | Solo pagas el API que consumas (BYOK) | [33] |

**Lectura:** **OpenCode** es el más barato en licencia (gratis, solo pagas el
API). **Copilot CLI** tiene el punto de entrada de pago más bajo (**$10**) y buena
relación valor/precio para uso GitHub-céntrico. **Junie** es el más caro para
usuarios intensivos si se suma la licencia de IDE (~$589/año), aunque BYOK lo
abarata [31].

## 8. Matriz de capacidades y autonomía

| Capacidad | Copilot CLI | Cursor CLI | Junie CLI | OpenCode |
| --- | --- | --- | --- | --- |
| Modo Plan | Sí | Sí | Sí | Sí |
| Modo autónomo / Autopilot | Sí (Autopilot) | Sí (background agents) | Media | Sí (Build) |
| Agentes paralelos / multi-sesión | Sí (fleet) | Sí | Parcial | Sí |
| Delegación en la nube | Sí | Sí | CI/CD | Local-first |
| Integración IDE | VS Code / GitHub | Cursor (VS Code) | **JetBrains (profunda)** | Extensión IDE |
| Integración VCS/PR | **GitHub nativo** | Jira / PR | Revisión de acciones | Configurable |
| Modelos locales / privacidad | Limitado (ZDR) | Parcial | Sí | **Local-first, sin telemetría** |
| Open source | No | No | No | **Sí (MIT)** |

Fuentes: [16][17][21][24][33][34].

## 9. Análisis enfocado: ¿qué tan bueno es Copilot CLI?

**Fortalezas:**

- **Mejor integración con GitHub** del grupo: flujo *issue → PR*, revisión de
  PRs, resúmenes de diffs y gobernanza empresarial (políticas por organización,
  auditoría, ZDR) [7][17].
- **Buen conjunto agéntico:** modos Plan y Autopilot, agentes especializados
  (Task/Explore/Review/Plan), delegación en segundo plano y ejecución paralela
  [16][17].
- **Conmutación de modelos sencilla** entre Claude, GPT y Gemini vía `/model`
  [15].
- **Precio de entrada bajo** ($10 Pro) con 300 *premium requests* y multi-modelo
  incluido [36].

**Debilidades:**

- **BYOK más restringido** que Junie u OpenCode: se opera sobre el catálogo de
  GitHub, no con cualquier clave de proveedor o modelos locales [11][15].
- **Score bruto en benchmark ligeramente inferior** a OpenCode y Cursor en
  Terminal-Bench (~68–72 % frente a ~75–78 % de OpenCode) [4][11].
- **Muy optimizado para el ecosistema GitHub**, lo que resta flexibilidad fuera de
  ese flujo [11].

**Veredicto:** Copilot CLI es la opción **más equilibrada y con mejor DX
GitHub-céntrica** del grupo, con el **precio de entrada de pago más bajo**. No es
el líder en benchmark puro ni el más abierto en BYOK, pero para equipos que ya
viven en GitHub ofrece la mejor relación integración/valor.

## 10. Conclusiones y recomendaciones

No hay un ganador único; la elección depende del eje que se priorice:

| Si priorizas… | Mejor elección | Por qué |
| --- | --- | --- |
| **Integración GitHub + DX + precio de entrada** | **Copilot CLI** | Flujo issue→PR, gobernanza, $10/mes [7][17][36] |
| **Score máximo en terminal / autonomía** | **OpenCode** o **Cursor CLI** | ~75–78 % TB (OpenCode); Cursor 79.8 % SWE-bench ML [4][22] |
| **BYOK total / sin lock-in / modelos locales / privacidad** | **OpenCode** (o **Junie**) | 75+ proveedores, MIT, local-first [33][34] |
| **Ecosistema JetBrains + tareas agénticas evaluadas** | **Junie CLI** | Líder SWE-Rebench, integración IDE profunda [24][26] |

**Recomendación general para un equipo GitHub-céntrico** (p. ej. backend
Python/FastAPI con PRs en GitHub): **Copilot CLI** como agente principal por
integración y costo, complementado opcionalmente con **OpenCode** cuando se
requiera BYOK, modelos locales o máxima flexibilidad de orquestación.

## 11. Nota sobre la fiabilidad de los datos

- Los valores **más auditables** provienen de los leaderboards oficiales
  (Terminal-Bench [1], SWE-bench Verified [2][39]). Los **rangos por agente**
  (p. ej. "Copilot CLI ~68–72 %") proceden de **comparativas de blogs de 2026** y
  **varían entre fuentes** [4][11].
- Al ser **harnesses multi-LLM**, un mismo agente puntúa distinto según el modelo
  emparejado; las cifras deben leerse como **órdenes de magnitud comparativos**,
  no como valores exactos absolutos ([sección 3](#3-conceptos-clave-harness-vs-modelo-y-benchmarks)).
- El ecosistema evoluciona muy rápido (versiones de modelos y precios cambian mes
  a mes). **Corte de esta investigación: mediados de julio de 2026.** Verifíquense
  los leaderboards en vivo [1][2][5] antes de decisiones de compra.

## 12. Referencias

**Leaderboards y benchmarks**

1. Terminal-Bench — *Leaderboard.* <https://www.tbench.ai/leaderboard>
2. SWE-bench — *Verified Leaderboard.* <https://www.swebench.com/verified.html>
3. SSOJet — *7 CLI Coding Agents Ranked by Real Terminal-Bench Scores.* <https://ssojet.com/blog/best-cli-coding-agents-ranked>
4. Morph LLM — *Best AI Coding Agent (2026): Ranked by Terminal-Bench, Price, and Source.* <https://www.morphllm.com/ai-coding-agent>
5. Artificial Analysis — *Coding Agents Comparison: Cursor, Claude Code, GitHub Copilot, and more.* <https://artificialanalysis.ai/agents/coding>
6. Morph LLM — *Codex vs Claude Code (July 2026).* <https://www.morphllm.com/comparisons/codex-vs-claude-code>
7. Morph LLM — *Claude Code vs GitHub Copilot (2026).* <https://www.morphllm.com/comparisons/claude-code-vs-copilot>
35. Digital Applied — *SWE-Bench vs Terminal-Bench: AI Benchmark Guide for 2026.* <https://www.digitalapplied.com/blog/swe-bench-terminal-bench-benchmark-guide-2026>
38. Morph LLM — *Best AI Coding Agents (June 2026): Scored Leaderboard.* <https://www.morphllm.com/best-ai-coding-agents-2026>
39. LLM-Stats — *SWE-Bench Verified Leaderboard.* <https://llm-stats.com/benchmarks/swe-bench-verified>

**Comparativas independientes (2026)**

8. Codersera — *AI Coding Agents 2026: Claude Code, Cursor 3.5, Copilot, OpenCode.* <https://codersera.com/blog/ai-coding-agents-complete-guide-2026/>
9. DevToolLab — *Best CLI AI Coding Agents in 2026.* <https://devtoollab.com/blog/top-cli-ai-coding-agents>
10. DevToolLab — *OpenCode 2026: Setup Guide for the Top Open-Source AI Coding Agent.* <https://devtoollab.com/blog/opencode-guide-2026>
11. Faros AI — *Best AI Coding Agents for 2026: Real-World Developer Reviews.* <https://www.faros.ai/blog/best-ai-coding-agents-2026>
40. Paperclipped — *AI Coding Assistants Compared 2026: Cursor vs Claude Code vs Copilot.* <https://www.paperclipped.de/en/blog/ai-coding-assistants-compared-2026/>

**GitHub Copilot CLI**

12. GitHub — *GitHub Copilot CLI.* <https://github.com/features/copilot/cli/>
13. GitHub Docs — *Models and pricing for GitHub Copilot.* <https://docs.github.com/en/copilot/reference/copilot-billing/models-and-pricing>
14. GitHub Docs — *Supported AI models in GitHub Copilot.* <https://docs.github.com/copilot/using-github-copilot/using-claude-sonnet-in-github-copilot>
15. DeepWiki — *Model Selection & Usage | github/copilot-cli.* <https://deepwiki.com/github/copilot-cli/3.4-model-selection-and-usage>
16. Awesome Agents — *GitHub Copilot CLI Goes Generally Available — Autopilot, Multi-Model.* <https://awesomeagents.ai/news/github-copilot-cli-generally-available/>
17. Visual Studio Magazine — *GitHub Copilot CLI Reaches General Availability.* <https://visualstudiomagazine.com/articles/2026/03/02/github-copilot-cli-reaches-general-availability-bringing-agentic-coding-to-the-terminal.aspx>
18. GitHub Blog — *Claude Sonnet 5 is generally available for GitHub Copilot.* <https://github.blog/changelog/2026-06-30-claude-sonnet-5-is-generally-available-for-github-copilot/>
19. GitHub Blog — *Claude and Codex now available for Copilot Business & Pro users.* <https://github.blog/changelog/2026-02-26-claude-and-codex-now-available-for-copilot-business-pro-users/>
36. NxCode — *GitHub Copilot 2026: Complete Guide to Pricing, Agent Mode.* <https://www.nxcode.io/resources/news/github-copilot-complete-guide-2026-features-pricing-agents>
37. NxCode — *AI Coding Tools Pricing Comparison 2026.* <https://www.nxcode.io/resources/news/ai-coding-tools-pricing-comparison-2026>

**Cursor CLI**

20. Cursor — *Introducing Composer 2.* <https://cursor.com/blog/composer-2>
21. BuildFastWithAI — *Cursor Composer 2.5: Benchmarks, Pricing & Full Review.* <https://www.buildfastwithai.com/blogs/cursor-composer-2-5-review-2026>
22. ChatForest — *Cursor Composer 2.5 Review: 79.8% SWE-Bench, Claude Opus 4.7 Parity.* <https://chatforest.com/reviews/cursor-composer-2-5-coding-model-review/>
23. Codersera — *Cursor 3.5 in 2026: Latest Features, Pricing, Setup.* <https://codersera.com/blog/cursor-ide-complete-guide-2026/>

**Junie CLI (JetBrains)**

24. JetBrains Blog — *Junie: The JetBrains AI Coding Agent Leaves Beta.* <https://blog.jetbrains.com/junie/2026/06/junie-coding-agent-out-of-beta/>
25. JetBrains Blog — *Junie CLI, the LLM-agnostic coding agent, is now in Beta.* <https://blog.jetbrains.com/junie/2026/03/junie-cli-the-llm-agnostic-coding-agent-is-now-in-beta/>
26. Vibecoding — *Junie Review 2026: JetBrains AI Coding Agent Tested.* <https://vibecoding.app/blog/junie-review>
27. Altai Tools — *Junie CLI Review (2026): JetBrains' Terminal Agent, Tested.* <https://altaitools.com/junie-cli-review/>
28. MCP.Directory — *Junie: JetBrains' AI Coding Agent (2026).* <https://mcp.directory/blog/junie-jetbrains-coding-agent-2026>
29. Daniel Vaughan — *Junie Goes GA: IDE-Integrated vs Terminal-Native Coding Agents.* <https://codex.danielvaughan.com/2026/06/25/junie-ga-ide-integrated-vs-terminal-native-coding-agents-codex-cli-comparison/>
30. JetBrains — *AI Plans & Pricing.* <https://www.jetbrains.com/ai-ides/buy/?section=personal&billing=yearly>
31. Andrew.ooo — *Junie vs Cursor vs Claude Code: AI Coding Agents Compared.* <https://andrew.ooo/answers/junie-vs-cursor-vs-claude-code-2026/>
32. Baeseokjae — *Junie CLI Review 2026: JetBrains Terminal AI Agent with BYOK Support.* <https://baeseokjae.github.io/posts/junie-cli-review-2026/>

**OpenCode**

33. OpenCode — *The open source AI coding agent.* <https://opencode.ai/>
34. ExplainX — *OpenCode AI Coding Agent: Open Source Terminal & Desktop Guide (2026).* <https://www.explainx.ai/blog/opencode-open-source-ai-coding-agent-guide-2026>
