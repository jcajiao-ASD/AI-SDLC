---
id: comparativa-agentes-ia-mono-llm
title: "Comparativa de Agentes de IA para Codificación con un Único Proveedor de LLM"
slug: comparativa-agentes-ia-mono-llm
summary: "Compara Claude Code, Codex CLI y Gemini CLI, incluyendo rendimiento, integración y riesgo de dependencia del proveedor."
category: agentes
status: vigente
cutoffDate: "2026-07-20"
revalidateAfter: "2027-01-20"
evidenceLevel: mixta
decisionType: comparacion-agentes
role: catalog
---

# Comparativa de Agentes de IA para Codificación con un Único Proveedor de LLM

[<- back](_index.md)

> **Estado:** Vigente. Investigación con corte a **mediados de julio de 2026**
> (datos recogidos el 20 de julio de 2026).
> **Alcance:** Agentes de línea de comandos (CLI) *atados a un único proveedor de
> LLM* — el "modelo de la casa": **Claude Code** (solo Anthropic), **Codex CLI**
> (solo OpenAI) y **Gemini CLI** (solo Google). Se excluyen deliberadamente los
> agentes multi-LLM (p. ej. **Copilot CLI**, **Cursor CLI**, **Junie CLI**,
> **OpenCode**), analizados en el documento hermano
> [Comparativa Multi-LLM](comparativa_agentes_ia_multi_llm.md).
> **Foco de la pregunta:** entre los agentes mono-proveedor, **¿cuál es el mejor
> agente de codificación en julio de 2026?**

---

## Índice

1. [Objetivo y alcance](#1-objetivo-y-alcance)
2. [Metodología y fuentes](#2-metodología-y-fuentes)
3. [Concepto clave: integración vertical (harness + modelo de la misma casa)](#3-concepto-clave-integración-vertical-harness--modelo-de-la-misma-casa)
4. [Los tres agentes mono-LLM en detalle](#4-los-tres-agentes-mono-llm-en-detalle)
   - [4.1 Claude Code (Anthropic)](#41-claude-code-anthropic)
   - [4.2 Codex CLI (OpenAI)](#42-codex-cli-openai)
   - [4.3 Gemini CLI (Google) — en transición](#43-gemini-cli-google--en-transición)
5. [Modelos y precios por agente (julio 2026)](#5-modelos-y-precios-por-agente-julio-2026)
6. [Comparativa de rendimiento (benchmarks)](#6-comparativa-de-rendimiento-benchmarks)
7. [Matriz de capacidades y autonomía](#7-matriz-de-capacidades-y-autonomía)
8. [Adopción y tracción de mercado](#8-adopción-y-tracción-de-mercado)
9. [Análisis enfocado: ¿cuál es el mejor agente mono-LLM?](#9-análisis-enfocado-cuál-es-el-mejor-agente-mono-llm)
10. [Conclusiones y recomendaciones](#10-conclusiones-y-recomendaciones)
11. [Nota sobre la fiabilidad de los datos](#11-nota-sobre-la-fiabilidad-de-los-datos)
12. [Referencias](#12-referencias)

---

## 1. Objetivo y alcance

Este documento responde a una pregunta concreta: **entre los agentes de
codificación que dependen de un único proveedor de LLM (el modelo de su propia
casa), ¿cuál ocupa la mejor posición en julio de 2026?**

El criterio de selección es el opuesto al del documento hermano: aquí solo entran
agentes **mono-proveedor**, que no permiten enchufar modelos de terceros como
opción de primera clase:

- **Claude Code** → exclusivamente modelos **Anthropic** (familia Claude) [1][4].
- **Codex CLI** → *de facto* exclusivamente modelos **OpenAI** (familia GPT-5.x)
  [6][7].
- **Gemini CLI** → exclusivamente modelos **Google** (familias Gemini/Gemma)
  [13].

Esta característica —un solo cerebro, diseñado por el mismo fabricante que
construye el andamiaje— es justo lo contrario del enfoque *anti-lock-in* de los
agentes multi-LLM. Su ventaja teórica es la **integración vertical**: el harness
y el modelo se co-optimizan. Su desventaja es el **vendor lock-in** y la
exposición total a las decisiones de negocio del proveedor (un riesgo que se
materializó de forma dramática con Gemini CLI; ver [§4.3](#43-gemini-cli-google--en-transición)).

El análisis cubre cinco ejes: **rendimiento en benchmarks**, **modelo(s) y
precio**, **capacidades agénticas**, **adopción/tracción** y **madurez y riesgo
de plataforma**.

## 2. Metodología y fuentes

La información se recopiló mediante investigación web con corte a **mediados de
julio de 2026**, priorizando fuentes por fiabilidad y distinguiendo siempre entre
**dato verificado en fuente primaria** y **cifra reportada por el fabricante o por
un agregador**:

1. **Fuentes primarias / oficiales** (máxima fiabilidad) — documentación y
   anuncios de Anthropic [1][2][4][5], OpenAI [6][7][8], Google [11][12][13];
   además la **API de GitHub** para versiones de *release* y estrellas [9][13].
2. **Benchmarks y agregadores independientes** — Artificial Analysis [10],
   Terminal-Bench [14], SWE-bench [15], entre otros.
3. **Comparativas y prensa de 2026** — Forbes [16], Flowtivity [17],
   IntuitionLabs [18], DeployHQ [19], dev.to [20], MarketTechPost [21].

Cada dato relevante se referencia en línea con la notación `[n]`, resuelta en la
sección [Referencias](#12-referencias). Las limitaciones —en particular la
**incomparabilidad de los benchmarks entre fabricantes**— se discuten en la
sección [11](#11-nota-sobre-la-fiabilidad-de-los-datos).

## 3. Concepto clave: integración vertical (harness + modelo de la misma casa)

Para interpretar la comparación hay que separar dos capas y entender qué las une
en este segmento:

- **El modelo (LLM):** el "cerebro" (p. ej. GPT-5.6 Sol, Claude Fable 5, Gemini
  3.1 Pro). Aporta el razonamiento base.
- **El harness (agente):** el andamiaje —bucle de herramientas, gestión de
  contexto, ejecución de comandos, edición de ficheros, recuperación de errores y
  modos de planificación.

**Diferencia central frente a los agentes multi-LLM:** en un agente mono-proveedor,
**el harness y el modelo los construye la misma empresa**. Esto permite una
**integración vertical** que los harnesses agnósticos no pueden replicar del todo:

- El modelo se **post-entrena específicamente** para las herramientas del harness
  (p. ej. GPT-5.6 se entrena para el bucle de Codex; Claude para el de Claude
  Code) [6][10].
- Funciones nuevas del modelo (razonamiento adaptativo, *Programmatic Tool
  Calling*, modo Ultra multi-agente) llegan **primero y mejor** al agente de la
  casa [6].
- La contrapartida es la **dependencia total**: precio, disponibilidad, límites y
  hasta la continuidad del producto quedan en manos de un solo proveedor.

**Consecuencia para la comparación:** aquí el rendimiento observado se aproxima a
`calidad_del_agente ≈ integración(harness ⊗ modelo_propio)`. Por eso los
benchmarks más relevantes son los que evalúan **el modelo dentro de su propio
harness nativo** (como el *Coding Agent Index* de Artificial Analysis [10]), no el
modelo en abstracto.

**Benchmarks usados en este documento:**

| Benchmark | Qué mide | Relevancia para agentes CLI |
| --- | --- | --- |
| **Artificial Analysis Coding Agent Index v1.1** | Composite (DeepSWE + Terminal-Bench v2 + SWE-Atlas-QnA) del **modelo en su harness nativo** | La más representativa para este segmento [10] |
| **Terminal-Bench 2.x** | Autonomía en una terminal real: compilar, configurar, DevOps, recuperar de errores | La más directa para tareas CLI [14] |
| **SWE-bench Verified / Pro** | Resolver *issues* reales de GitHub | Estándar para parcheo de código [15] |

## 4. Los tres agentes mono-LLM en detalle

### 4.1 Claude Code (Anthropic)

- **Fabricante:** Anthropic. Disponible desde mayo de 2025; en julio de 2026 opera
  en **terminal, extensión de IDE (VS Code/Cursor, JetBrains), app de escritorio,
  web (`claude.ai/code`) y móvil** [4].
- **Proveedor de LLM:** **exclusivamente Anthropic**. El "soporte de terceros" que
  menciona la documentación es *routing* a través de AWS Bedrock, Google Cloud o
  Microsoft Foundry — pero **siempre ejecutando modelos Claude**; no admite
  OpenAI, Gemini ni pesos abiertos [1][4].
- **Modelos (jul 2026):** familia Claude, seleccionable con alias
  (`opus`, `sonnet`, `haiku`, `fable`, `opusplan`) [5]:
  - **Claude Fable 5** (`claude-fable-5`): modelo insignia, GA el **9 de junio de
    2026** (con redespliegue global a inicios de julio de 2026 [3]); "inteligencia
    de próxima generación para agentes de larga duración"; razonamiento adaptativo
    siempre activo [1][2].
  - **Claude Opus 4.8**: recomendado por defecto para coding agéntico complejo y
    trabajo *enterprise* [1].
  - **Claude Sonnet 5**: el "caballo de batalla" (velocidad + inteligencia), con
    ventana **nativa de 1M de tokens** [1].
  - **Claude Haiku 4.5**: el más rápido y económico [1].
  - **Claude Mythos 5**: mismas specs que Fable 5, **solo por invitación**
    (Project Glasswing) [1].
- **Capacidades agénticas:** **subagentes** y *agent teams* (paralelismo),
  **modo Plan**, **hooks**, **Skills**, **MCP**, *checkpointing*, herramienta
  **advisor** (consulta a un modelo más fuerte en momentos clave), sesiones en la
  nube y *sandbox* integrado [4][5]. Ventana de contexto de **1M de tokens** en
  Fable 5 / Opus 4.8 / Sonnet 5 [1].
- **Versión:** instalación nativa con autoactualización; también Homebrew/WinGet
  [4].
- **Lock-in:** total a Anthropic (ventaja: integración; riesgo: dependencia).

### 4.2 Codex CLI (OpenAI)

- **Fabricante:** OpenAI. Agente de terminal **open source (Rust, Apache-2.0)**;
  *release* estable **`rust-v0.144.6`** (18-jul-2026) y alpha `0.145.0` en curso
  [9]. Se instala también como extensión para **VS Code, Cursor y Windsurf**, y
  como app de escritorio, compartiendo `~/.codex/config.toml` [7].
- **Proveedor de LLM:** **OpenAI de facto**. Aunque el código abierto admite
  técnicamente cualquier *endpoint* compatible con Chat Completions, esa vía está
  **marcada como *deprecated*** dentro de Codex; la ruta viva (Responses API) y
  todas las funciones en la nube requieren cuenta OpenAI [7].
- **Modelos (jul 2026):** familia **GPT-5.6**, GA hacia el **9 de julio de 2026**,
  con ventana de **272 000 tokens** [7][9]:
  - **GPT-5.6 Sol** — insignia, "la mayor capacidad para coding complejo, uso de
    computadora, investigación y ciberseguridad" [7].
  - **GPT-5.6 Terra** — equilibrado, competitivo con GPT-5.5 a menor costo [7].
  - **GPT-5.6 Luna** — económico, el más rápido y barato de la familia [7].
  - Otros disponibles: GPT-5.5, GPT-5.4/mini y `gpt-5.3-codex-spark` (preview de
    baja latencia, solo Pro) [7].
- **Modo Ultra (novedad con GPT-5.6):** coordina **cuatro subagentes en paralelo**
  por defecto; disponible en planes Plus y superiores [6][7].
- **Capacidades agénticas:** **Codex Cloud** (tareas en VMs gestionadas por
  OpenAI), **revisión de PRs en GitHub** con `@codex review` (marca solo P0/P1),
  **MCP**, sistema **AGENTS.md**, modos de *sandbox* y aprobación granulares,
  `/review`, *computer use* (macOS), memorias y *Programmatic Tool Calling* [6][7].
- **Lock-in:** *de facto* a OpenAI, aunque el cliente sea open source.

### 4.3 Gemini CLI (Google) — en transición

- **Fabricante:** Google. Agente de terminal **open source (Apache-2.0)** lanzado
  en junio de 2025; *release* estable **`v0.51.0`** (16-jul-2026) [13].
- **Proveedor de LLM:** **exclusivamente Google** (familias Gemini/Gemma; ningún
  ID de modelo de terceros en el código) [13].
- **Modelos (jul 2026):** `gemini-2.5-pro`/`flash` como cadena estable por defecto
  y **Gemini 3.x** (`gemini-3-pro-preview`, `gemini-3.1-pro-preview`,
  `gemini-3.5-flash`) para *preview*/empresa; **ventana de 1M de tokens** [13].
- **Capacidades:** **MCP**, *grounding* nativo con **Google Search**, extensiones,
  **GEMINI.md**, *GitHub Actions* (`@gemini-cli`), subagentes y *checkpointing*
  [13].
- **Advertencia: cambio decisivo — sunset para individuos (verificado en fuente primaria):**
  el **18 de junio de 2026**, Google **dejó de servir peticiones** de Gemini CLI a
  las cuentas gratuitas/personales, Google AI Pro y Ultra, y **desactivó el
  "Login with Google"** [12]. Anunciado en Google I/O 2026, Google está
  **migrando a los desarrolladores a *Antigravity CLI*** (nuevo agente, escrito en
  **Go**, sin paridad de funciones 1:1 al inicio) [11]. **Solo conserva acceso**
  quien tenga licencia **Gemini Code Assist Standard/Enterprise** o use **claves
  de API de pago** [11][12].
- **Lock-in:** total a Google; y **el producto está siendo reemplazado** — el
  mayor riesgo de plataforma de los tres.

## 5. Modelos y precios por agente (julio 2026)

Precios de **API** por millón de tokens (MTok). Los planes de suscripción
(ChatGPT, Claude, etc.) tienen tarifas y límites propios; ver notas.

| Agente | Modelo insignia | Precio API (in / out) | Contexto | Fuente |
| --- | --- | --- | --- | --- |
| **Claude Code** | Claude Fable 5 | **$10 / $50** MTok | 1M | [1] |
| | Claude Opus 4.8 | $5 / $25 MTok | 1M | [1] |
| | Claude Sonnet 5 | $3 / $15 MTok | 1M | [1] |
| | Claude Haiku 4.5 | $1 / $5 MTok | 200K | [1] |
| **Codex CLI** | GPT-5.6 Sol | **$5 / $30** MTok | 272K | [6] |
| | GPT-5.6 Terra | $2.50 / $15 MTok | 272K | [6] |
| | GPT-5.6 Luna | $1 / $6 MTok | 272K | [6] |
| **Gemini CLI** | Gemini 2.5 Pro / 3.x | ~$1.25–2 / $10–12 MTok* | 1M | [13]* |

\* Los precios exactos por modelo de Gemini provienen de agregadores y no pudieron
cruzarse por completo con la página oficial (marcado como *reportado*); ver
[§11](#11-nota-sobre-la-fiabilidad-de-los-datos).

**Notas de acceso por suscripción:**

- **Claude Code:** incluido en Claude Pro/Max/Team/Enterprise; Sonnet 5 es el
  modelo por defecto en Free/Pro [1].
- **Codex CLI:** incluido en **todos los planes ChatGPT** (Free, Go $8, Plus $20,
  Pro desde $100/$200, Business $25/usuario, Enterprise), con límites por ventana
  de 5 h y sistema de créditos; también por clave de API [7][8].
- **Gemini CLI:** el *tier* gratuito histórico (1 000 req/día) **terminó el
  18-jun-2026**; hoy requiere licencia **Code Assist Standard (1 500 req/día) /
  Enterprise (2 000 req/día)** o clave de API de pago [11][12].

## 6. Comparativa de rendimiento (benchmarks)

> **Advertencia metodológica (léase antes de las tablas):** las cifras
> reportadas por cada fabricante usan *scaffolding* propio y **no son directamente
> comparables** entre sí; suelen quedar 5–20 puntos por encima de la línea base
> neutral (mini-SWE-agent) de `swebench.com`. Se distingue abajo lo **verificado**
> de lo **reportado**. Ver [§11](#11-nota-sobre-la-fiabilidad-de-los-datos).

### 6.1 Artificial Analysis — Coding Agent Index v1.1 (modelo en su harness nativo) — *verificado*

Es el benchmark **más representativo** para este segmento, porque evalúa cada
modelo dentro del agente de su propia casa [10]. OpenAI confirma el liderazgo en
su anuncio oficial [6]:

| Modelo (harness nativo) | Índice | Nota |
| --- | --- | --- |
| **GPT-5.6 Sol (max) — Codex** | **80** | **Nuevo SOTA**; +2.8 sobre Fable 5, con < ½ de tokens, < ½ de tiempo y ~⅓ menos de costo [6][10] |
| GPT-5.6 Terra — Codex | 77 | ~60 % menos costo/tarea que Sol [10] |
| Claude Fable 5 — Claude Code | ~77.2 | (implícito: "2.8 por debajo de Sol en 80") [6] |
| GPT-5.6 Luna — Codex | 75 | ~80 % menos costo/tarea que Sol [10] |

> Cita oficial [6]: *"GPT-5.6 Sol with max reasoning sets a new state of the art at
> 80, 2.8 points above Fable 5, while using less than half the output tokens…"*

Otros resultados oficiales de GPT-5.6 Sol [6]: **Agents' Last Exam 53.6**
(+13.1 sobre Fable 5), **Artificial Analysis Intelligence Index 59** (1 pt por
debajo de Fable 5 a ~⅓ del costo), **BrowseComp 92.2 %** (SOTA de navegación
agéntica), **OSWorld 2.0 62.6 %** (supera a Opus 4.8 con 85 % menos tokens).

### 6.2 SWE-bench Verified / Pro (reportado por fabricante) — *usar con cautela*

| Modelo | SWE-bench Verified | SWE-bench Pro | Fuente |
| --- | --- | --- | --- |
| Claude Mythos 5 (restringido) | ~95.5 % | ~77.8 % | Anthropic (agregadores) [2] |
| **Claude Fable 5** | **~95.0 %** | **80.3 %** | Anthropic (agregadores) [2] |
| Claude Opus 4.8 | ~88.6 % | ~69.2 % | Anthropic (agregadores) [2] |
| Gemini 3.1 Pro | 80.6 % | 54.2 % | Tabla de Google (feb 2026) [21][22] |
| GPT-5.3-Codex | 76.2 % | 56.8 % | nxcode/flowtivity [17][22] |

**Lectura:** en el estándar de parcheo de código, **la familia Claude lidera**
(Fable 5 ~95 % reportado), aunque estas cifras aún **no figuran en la línea base
neutral** de `swebench.com` [15].

### 6.3 Terminal-Bench (el más relevante para CLI) — *mixto*

| Agente / Modelo | Terminal-Bench 2.0 | Terminal-Bench 2.1* | Fuente |
| --- | --- | --- | --- |
| **Codex CLI + GPT-5.6 Sol** | — | **~88.8 %** (single) / **~91.9 %** (Ultra)* | secundarias [14]* |
| Codex CLI + GPT-5.5 | **82.7 %** | — | OpenAI/MarkTechPost [21] |
| Claude Code + Fable 5 | — | ~88.0 %* | secundarias [14]* |
| Codex + GPT-5.3-Codex | 77.3 % | — | flowtivity/nxcode [17][22] |
| Claude Code + Opus 4.7/4.8 | 69.4 % | ~78.9 %* | secundarias [17]* |
| Gemini CLI + Gemini 3.1 Pro | 68.5 % | ~70.7 %* | secundarias [22]* |

\* Las cifras de **Terminal-Bench 2.1** provienen de blogs/agregadores (no se
pudieron leer directamente del *leaderboard* oficial, que es dinámico); trátense
como **reportadas**. La **dirección** es consistente en todas las fuentes:
**Codex CLI ≳ Claude Code > Gemini CLI** en tareas de terminal [14][17].

### 6.4 Síntesis de rendimiento

- **Codex CLI (GPT-5.6 Sol)** encabeza los benchmarks **más recientes y más
  relevantes para CLI**: el Coding Agent Index (80, SOTA, *verificado*) y
  Terminal-Bench, además con mejor costo/tarea [6][10].
- **Claude Code (Fable 5)** lidera **SWE-bench Verified** (parcheo de *issues*) y
  queda a un pelo en el Índice (~77.2) [2][6].
- **Gemini CLI** queda **por detrás** en las tres métricas y, además, **está
  siendo descontinuado** para individuos [11][12].

## 7. Matriz de capacidades y autonomía

| Capacidad | Claude Code | Codex CLI | Gemini CLI |
| --- | --- | --- | --- |
| **Proveedor de LLM** | Solo Anthropic | Solo OpenAI (de facto) | Solo Google |
| **Código abierto** | No (cliente propietario) | **Sí** (Rust, Apache-2.0) | Sí (Apache-2.0) |
| **Multi-agente / subagentes** | Sí (*agent teams*) | Sí (**modo Ultra**, 4 agentes) | Sí |
| **Modo Plan** | Sí | Sí (aprobaciones) | Parcial |
| **Ejecución en la nube** | Sí (sesiones remotas) | Sí (**Codex Cloud**) | Vía Code Assist |
| **Revisión de PRs / GitHub** | Sí | Sí (`@codex review`, P0/P1) | Sí (`@gemini-cli`) |
| **MCP** | Sí | Sí | Sí |
| **Superficies** | Terminal, IDE, escritorio, web, móvil | Terminal, IDE, escritorio, nube | Terminal, IDE (Code Assist), Actions |
| **Ventana de contexto** | 1M | 272K | 1M |
| **Instrucciones de proyecto** | CLAUDE.md | AGENTS.md | GEMINI.md |
| **Estado de plataforma** | Estable, en expansión | Estable, en expansión | **En sunset → Antigravity CLI** |

## 8. Adopción y tracción de mercado

- **Codex CLI:** **5 millones de usuarios activos semanales** a finales de junio de
  2026 (Forbes) [16]; **~100 000 estrellas** en GitHub (API verificada, 20-jul-2026)
  [9]; **1 millón de descargas** en la primera semana de la app de escritorio (feb
  2026) [24].
- **Claude Code:** **domina el *mindshare*** — 75 % de la "voz de influencers" en X
  sobre agentes de codificación (GlobalData), frente a 22 % de Codex y 3 % de
  Gemini CLI [18][23]; reportado como líder entre equipos en tareas complejas y con
  *run rate* de ingresos superior a **$1 000 M** a finales de 2025 [18].
- **Gemini CLI:** **>100 000 estrellas** y 6 000+ PRs, "millones de usuarios"
  (Google) — pero **descontinuado para individuos** desde el 18-jun-2026 [11][12].

## 9. Análisis enfocado: ¿cuál es el mejor agente mono-LLM?

Descartado **Gemini CLI** como opción para individuos (sunset verificado hacia
Antigravity CLI [11][12]), la disputa por "el mejor" queda entre **Codex CLI** y
**Claude Code**. No hay un ganador único en todos los ejes; el veredicto depende
del uso, pero puede razonarse con la evidencia disponible:

**Codex CLI (GPT-5.6 Sol) — ganador general por estrecho margen (jul 2026):**

- **Lidera los benchmarks más frescos y más pertinentes para un agente CLI:**
  Coding Agent Index = **80 (SOTA, verificado)** y Terminal-Bench [6][10][14].
- **Mejor relación costo/rendimiento:** el propio anuncio y Artificial Analysis lo
  sitúan **~⅓ más barato y más rápido** que Fable 5 a igual o mejor resultado
  [6][10].
- **Open source** (Rust, Apache-2.0), multiplataforma y con **modo Ultra**
  multi-agente y *Codex Cloud* [6][7][9].
- **Ecosistema ChatGPT:** incluido incluso en Free/Go, con 5M de usuarios
  semanales [8][16].
- *Contras:* ventana de contexto menor (272K vs 1M) y *lock-in* de facto a OpenAI.

**Claude Code (Fable 5) — co-líder y mejor para ingeniería autónoma compleja:**

- **Líder en SWE-bench Verified** (~95 % reportado) y consenso de reseñas como el
  mejor para **refactors multiarchivo, cambios de producción y comprensión de
  bases de código grandes** [2][18][20].
- **Domina el *mindshare* y la adopción *enterprise*** (75 % de voz de
  influencers; *run rate* > $1 000 M) [18][23].
- **1M de contexto**, subagentes, *agent teams*, y la mayor superficie de producto
  (terminal/IDE/escritorio/web/móvil) [1][4].
- *Contras:* más caro por token y sin cliente open source.

**Conclusión del análisis:** si se busca **el agente CLI mono-LLM más capaz y con
mejor valor en julio de 2026**, **Codex CLI con GPT-5.6 Sol** es la elección más
defendible por los benchmarks independientes más recientes, el costo y la apertura.
Si el trabajo es **ingeniería autónoma compleja, refactors de producción o
integración *enterprise*/*mindshare***, **Claude Code (Fable 5/Opus 4.8)** es
igualmente de primer nivel y suele preferirse. La diferencia entre ambos es
**estrecha y dependiente de la tarea**; ambos superan claramente a Gemini CLI en su
estado actual.

## 10. Conclusiones y recomendaciones

- **Mejor global (CLI, valor y benchmarks recientes):** **Codex CLI + GPT-5.6 Sol**
  [6][10].
- **Mejor para código autónomo complejo / producción / *enterprise*:**
  **Claude Code + Claude Fable 5 (u Opus 4.8)** [2][18].
- **Evitar como apuesta nueva para individuos:** **Gemini CLI**, en transición a
  Antigravity CLI [11][12]. Para equipos ya en Google Cloud con licencia Code
  Assist, sigue siendo viable a corto plazo, pero conviene planear la migración.

**Recomendación por perfil:**

| Perfil / necesidad | Recomendación |
| --- | --- |
| Máximo rendimiento CLI + mejor costo | **Codex CLI (GPT-5.6 Sol)** |
| Refactors grandes, multiarchivo, producción | **Claude Code (Fable 5 / Opus 4.8)** |
| Ya usas ChatGPT / quieres open source | **Codex CLI** |
| Ya usas Claude / *enterprise* con *mindshare* | **Claude Code** |
| Ecosistema Google Cloud (con Code Assist) | Gemini CLI (con plan de migración a Antigravity) |

> **Nota sobre lock-in:** los tres son mono-proveedor y comparten el riesgo
> estructural que Gemini CLI acaba de ejemplificar. Equipos que prioricen evitar
> ese riesgo deberían comparar también los agentes **multi-LLM** del
> [documento hermano](comparativa_agentes_ia_multi_llm.md).

## 11. Nota sobre la fiabilidad de los datos

- **Verificado en fuente primaria (alta confianza):** versiones de *release*
  (API de GitHub [9][13]); modelos y precios de Claude [1]; familia GPT-5.6, modo
  Ultra y precios de API de OpenAI [6][7]; **sunset de Gemini CLI y transición a
  Antigravity CLI** [11][12]; el Coding Agent Index = 80 de GPT-5.6 Sol, citado
  textualmente por OpenAI [6].
- **Reportado por fabricante / agregador (usar con cautela):** las puntuaciones de
  **SWE-bench Verified/Pro** (p. ej. Fable 5 ~95 %) usan *scaffolding* propio, **no
  son comparables entre fabricantes** y **aún no aparecen** en la línea base neutral
  de `swebench.com` [15]. Las cifras de **Terminal-Bench 2.1** provienen de blogs y
  no se pudieron leer del *leaderboard* oficial [14].
- **No disponible:** la **Stack Overflow Developer Survey 2026** abrió el 23-jun-2026
  y **aún no tiene resultados publicados**; cualquier estadística atribuida a ella
  a julio de 2026 es infundada.
- **Precios de Gemini por modelo:** parcialmente cruzados con la página oficial;
  marcados con asterisco en la [§5](#5-modelos-y-precios-por-agente-julio-2026).
- **Recomendación:** para decisiones de compra, contrástense siempre los
  *leaderboards* en vivo [10][14][15] y las páginas oficiales de precios.

## 12. Referencias

**Fuentes primarias / oficiales**

1. Anthropic — *Models overview* (Fable 5, Opus 4.8, Sonnet 5, Haiku 4.5; precios y contexto). <https://platform.claude.com/docs/en/about-claude/models/overview>
2. Anthropic — *Introducing Claude Fable 5 and Claude Mythos 5* (9 jun 2026). <https://www.anthropic.com/news/claude-fable-5-mythos-5>
3. Anthropic — *Redeploying Fable 5* (1 jul 2026). <https://www.anthropic.com/news/redeploying-fable-5>
4. Claude Code — *Overview* (superficies, instalación). <https://code.claude.com/docs/en/overview>
5. Claude Code — *Model configuration* (alias `opus`/`sonnet`/`fable`/`opusplan`). <https://code.claude.com/docs/en/model-config>
6. OpenAI — *GPT-5.6 has landed / anuncio oficial* (Sol/Terra/Luna, Coding Agent Index 80, precios API, ~9 jul 2026). <https://openai.com/index/gpt-5-6/>
7. OpenAI Codex — *Docs: Models & configuración* (modelos, Ultra, sandbox, AGENTS.md). <https://learn.chatgpt.com/docs/models>
8. OpenAI Codex — *Docs: Pricing* (planes ChatGPT, créditos, límites). <https://learn.chatgpt.com/docs/pricing>
9. GitHub — *openai/codex releases & repo* (v0.144.6, ~100K estrellas; API verificada 20 jul 2026). <https://github.com/openai/codex/releases>
10. Artificial Analysis — *GPT-5.6 has landed* (Coding Agent Index v1.1). <https://artificialanalysis.ai/articles/gpt-5-6-has-landed>
11. Google Developers Blog — *An important update: transitioning Gemini CLI to Antigravity CLI* (Google I/O 2026). <https://developers.googleblog.com/an-important-update-transitioning-gemini-cli-to-antigravity-cli/>
12. Google — *Gemini Code Assist for individuals: deprecation* (sunset 18 jun 2026). <https://developers.google.com/gemini-code-assist/docs/deprecations/code-assist-individuals>
13. GitHub — *google-gemini/gemini-cli* (v0.51.0, modelos, README; API verificada 20 jul 2026). <https://github.com/google-gemini/gemini-cli/releases>

**Benchmarks y agregadores**

14. Terminal-Bench — *Leaderboard (tbench.ai), terminal-bench@2.1.* <https://www.tbench.ai/>
15. SWE-bench — *Verified Leaderboard (línea base mini-SWE-agent).* <https://www.swebench.com/>
21. MarkTechPost — *OpenAI releases GPT-5.5… 82.7% on Terminal-Bench 2.0* (23 abr 2026). <https://www.marktechpost.com/2026/04/23/openai-releases-gpt-5-5-a-fully-retrained-agentic-model-that-scores-82-7-on-terminal-bench-2-0-and-84-9-on-gdpval/>
22. NxCode — *Gemini 3.1 Pro: complete guide, benchmarks, pricing* (19 feb 2026). <https://www.nxcode.io/resources/news/gemini-3-1-pro-complete-guide-benchmarks-pricing-api-2026>

**Comparativas y prensa (2026)**

16. Forbes — *Could Codex Be The Answer To OpenAI's Problems?* (5M WAU; 30 jun 2026). <https://www.forbes.com/sites/the-prompt/2026/06/30/could-codex-be-the-answer-to-openais-problems/>
17. Flowtivity — *AI Coding Agents Compared 2026* (feb 2026). <https://flowtivity.ai/blog/ai-coding-agents-compared-2026/>
18. IntuitionLabs — *Claude Code vs Codex vs Gemini CLI* (abr 2026). <https://intuitionlabs.ai/articles/claude-code-vs-codex-vs-gemini-cli-comparison>
19. DeployHQ — *Comparing Claude Code, OpenAI Codex and Google Gemini CLI* (12 jun 2026). <https://www.deployhq.com/blog/comparing-claude-code-openai-codex-and-google-gemini-cli-which-ai-coding-assistant-is-right-for-your-deployment-workflow>
20. dev.to/rahulxsingh — *Claude Code vs Codex CLI vs Gemini CLI: which AI terminal agent wins in 2026* (abr 2026). <https://dev.to/rahulxsingh/claude-code-vs-codex-cli-vs-gemini-cli-which-ai-terminal-agent-wins-in-2026-55f5>
23. GlobalData — *Claude Code captures 75% share of influencers' voice on X in coding-agent race* (2026). <https://www.globaldata.com/media/business-fundamentals/claude-code-captures-75-share-of-influencers-voice-on-x-in-coding-agent-race-reveals-globaldata/>
24. VentureBeat — *OpenAI's new Codex app hits 1M downloads in first week* (feb 2026). <https://venturebeat.com/technology/openais-new-codex-app-hits-1m-downloads-in-first-week-but-limits-may-be>
