---
id: comparativa-llms-sdlc
title: "Comparativa de LLMs para Ingeniería de Software en el Ciclo SDLC"
slug: comparativa-llms-sdlc
summary: "Evalúa modelos frontera por inteligencia, precio, velocidad, privacidad y precisión agéntica, con recomendaciones por fase."
category: modelos
status: vigente
cutoffDate: "2026-07-20"
revalidateAfter: "2027-01-20"
evidenceLevel: mixta
decisionType: seleccion-modelo
role: featured-source
featuredStory: llm-por-fase
relatedStories:
  - configurador-stack
---

# Comparativa de LLMs para Ingeniería de Software en el Ciclo SDLC

[<- back](_index.md)

> **Estado:** Vigente. Investigación con corte a **mediados de julio de 2026**
> (datos recogidos el 20 de julio de 2026).
> **Alcance:** los **modelos de lenguaje (LLM)** en sí mismos —no los agentes/CLI
> que los envuelven, analizados en los documentos hermanos
> [Mono-LLM](comparativa_agentes_ia_mono_llm.md) y
> [Multi-LLM](comparativa_agentes_ia_multi_llm.md)—. Se examinan las familias
> frontera **Anthropic Claude**, **OpenAI GPT-5.6** y **Google Gemini 3.x**, con
> los retadores **xAI Grok** y los **pesos abiertos** (DeepSeek, Qwen, Kimi) como
> línea de referencia.
> **Foco de la pregunta:** **¿cuál es el mejor LLM para ingeniería de software del
> ciclo SDLC en julio de 2026?** Se responde con un **ponderado** de cinco ejes
> (precio, inteligencia, privacidad empresarial, rendimiento en tiempo y precisión
> agéntica) y con una **tabla del mejor modelo por fase del SDLC**.

---

## Índice

1. [Objetivo y alcance](#1-objetivo-y-alcance)
2. [Metodología y fuentes](#2-metodología-y-fuentes)
3. [Concepto clave: el modelo (LLM) no es el agente (harness)](#3-concepto-clave-el-modelo-llm-no-es-el-agente-harness)
4. [Los contendientes (familias de modelos, julio 2026)](#4-los-contendientes-familias-de-modelos-julio-2026)
5. [Eje 1 — Inteligencia (razonamiento y conocimiento)](#5-eje-1--inteligencia-razonamiento-y-conocimiento)
6. [Eje 2 — Precio (coste por token y por tarea)](#6-eje-2--precio-coste-por-token-y-por-tarea)
7. [Eje 3 — Rendimiento en tiempo (velocidad y latencia)](#7-eje-3--rendimiento-en-tiempo-velocidad-y-latencia)
8. [Eje 4 — Precisión agéntica (tool-calling y autonomía)](#8-eje-4--precisión-agéntica-tool-calling-y-autonomía)
9. [Eje 5 — Privacidad y gobernanza empresarial](#9-eje-5--privacidad-y-gobernanza-empresarial)
10. [Síntesis: ponderado global (scorecard)](#10-síntesis-ponderado-global-scorecard)
11. [El mejor LLM por fase del SDLC](#11-el-mejor-llm-por-fase-del-sdlc)
12. [Conclusiones y recomendaciones](#12-conclusiones-y-recomendaciones)
13. [Nota sobre la fiabilidad de los datos](#13-nota-sobre-la-fiabilidad-de-los-datos)
14. [Referencias](#14-referencias)

---

## 1. Objetivo y alcance

Este documento responde a una pregunta concreta: **entre los LLM frontera
disponibles en julio de 2026, ¿cuál es el mejor para las tareas de ingeniería de
software a lo largo del ciclo de vida del desarrollo (SDLC)?**

La premisa de partida —compartida con toda la literatura reciente [29][31]— es que
**no existe un único modelo que sea el mejor en todo**. El panorama de 2026 está
definido por la **especialización**: un modelo lidera en razonamiento puro, otro
en autonomía agéntica, otro en coste/velocidad. Por eso el análisis se estructura
en dos entregables complementarios:

1. Un **ponderado global** ([§10](#10-síntesis-ponderado-global-scorecard)) que
   combina los cinco ejes que pidió el encargo —**precio, inteligencia, privacidad
   empresarial, rendimiento en tiempo y precisión agéntica**— y que es **ajustable
   por perfil** (valor vs. calidad crítica).
2. Una **tabla del mejor modelo por fase del SDLC**
   ([§11](#11-el-mejor-llm-por-fase-del-sdlc)) —requisitos, diseño/arquitectura,
   codificación, pruebas/QA, revisión de código, DevOps/despliegue, documentación
   y mantenimiento—, porque la elección óptima cambia de una fase a otra.

**Diferencia con los documentos hermanos:** aquellos comparan **agentes** (los
*harnesses* CLI) [33][34]. Este compara **los cerebros** (los LLM). Un mismo modelo
puede usarse desde varios agentes; aquí se evalúa el modelo en abstracto y en su
mejor andamiaje disponible.

## 2. Metodología y fuentes

La información se recopiló mediante investigación web con corte a **mediados de
julio de 2026**, distinguiendo siempre entre **dato verificado en fuente
primaria** y **cifra reportada por el fabricante o por un agregador**:

1. **Fuentes primarias / oficiales** (máxima fiabilidad) — documentación de
   Anthropic [1][2], OpenAI [3][6], Google [8] y sus **páginas de privacidad y
   retención** [4][5][7].
2. **Benchmarks y agregadores independientes** — Artificial Analysis
   (Intelligence Index, HLE, Coding Agent Index, velocidad) [9][10][11][12],
   Vals AI [13], Morph LLM [14], SWE-bench [15], Terminal-Bench [16], τ-bench [24].
3. **Comparativas especializadas de 2026** — precios [17][18][19], latencia
   [20][21], capacidades agénticas [22][23], privacidad [25][26][27][28] y
   **LLMs por fase del SDLC** (HackerRank ASTRA [29][30], nexos.ai [31],
   VisionVix [32]).

Cada dato relevante se referencia en línea con la notación `[n]`, resuelta en la
sección [Referencias](#14-referencias). Las limitaciones —en particular la
**incomparabilidad de los benchmarks entre fabricantes** y el carácter
**analítico** del mapeo por fases— se discuten en la
sección [13](#13-nota-sobre-la-fiabilidad-de-los-datos).

## 3. Concepto clave: el modelo (LLM) no es el agente (harness)

Para interpretar la comparación hay que separar dos capas, igual que en los
documentos hermanos:

- **El modelo (LLM):** el "cerebro" (Claude Fable 5, GPT-5.6 Sol, Gemini 3.1 Pro).
  Aporta el razonamiento, el conocimiento y la política de datos del **proveedor**.
- **El harness (agente):** el andamiaje (bucle de herramientas, gestión de
  contexto, ejecución) — Copilot CLI, Claude Code, Codex CLI, etc.

Este documento evalúa **el modelo**. La consecuencia práctica es que el
rendimiento final que verá un equipo es
`resultado ≈ calidad_del_modelo × calidad_del_harness`, pero aquí aislamos el
primer factor y, cuando un benchmark solo existe "en harness" (p. ej. el *Coding
Agent Index*), se indica expresamente [11].

**Los cinco ejes de evaluación (los que pidió el encargo):**

| Eje | Qué mide | Métricas / señales usadas |
| --- | --- | --- |
| **Inteligencia** | Razonamiento, conocimiento, calidad de código | AA Intelligence Index, HLE, GPQA, MMLU-Pro, SWE-bench [9][10][13][15] |
| **Precio** | Coste por millón de tokens y coste efectivo por tarea | Tarjetas de API oficiales y agregadores [1][3][17][18] |
| **Privacidad empresarial** | Entrenamiento con datos, retención, ZDR, certificaciones, residencia | Políticas oficiales y mapas de privacidad 2026 [4][5][6][25] |
| **Rendimiento en tiempo** | Velocidad (tok/s) y latencia (TTFT) | Artificial Analysis y benchmarks de latencia [12][20][21] |
| **Precisión agéntica** | Fiabilidad de tool-calling y autonomía de larga duración | Coding Agent Index, Terminal-Bench, τ-bench, BrowseComp, OSWorld [11][16][22][24] |

### 3.1 El eje transversal: el modo de esfuerzo (*reasoning effort*)

Antes de mirar cualquier número hay que fijar una variable que **atraviesa los
cinco ejes**: el **modo de esfuerzo de razonamiento**. Los modelos frontera de 2026
ya no tienen "una" inteligencia fija; exponen un **dial** que decide cuánto
"piensan" antes de responder. Subir el dial mejora la inteligencia y la precisión
agéntica, pero **dispara el coste y la latencia**; bajarlo hace lo contrario. Por
eso, **una cifra de benchmark sin su modo de esfuerzo es incomparable**.

Cada proveedor lo implementa distinto:

| Proveedor | Cómo se controla | Niveles (jul 2026) | Notas clave |
| --- | --- | --- | --- |
| **Anthropic — Claude** | Parámetro `effort` + `thinking: {type:"adaptive"}` | low · medium · **high (def.)** · xhigh · max | "Adaptive thinking" es el **único** modo de razonamiento extendido (los presupuestos de tokens manuales están *deprecated*); **no se puede apagar** en Fable 5. `xhigh` = agentes de 30+ min; `max` = razonamiento sin tope [38][39] |
| **OpenAI — GPT-5.6** | Parámetro `reasoning_effort` (× Codex/Standard × Standard/Fast) | minimal · low · medium · **high** · xhigh · max | ~**23×** más tokens de `minimal` a `high`; `max` (con modo **Ultra** multiagente) = lo más caro y lento; la familia tiene **72** combinaciones posibles [35][36][37] |
| **Google — Gemini 3.x** | Parámetro `thinking_level` (+ modo **Deep Think**) | LOW · **HIGH (def.)** — MEDIUM no soportado (Gemini 2.5 usaba `thinking_budget` numérico 0–32K) | No se puede **apagar** el "thinking"; **Deep Think** sube ARC-AGI-2 de 31.1 % → 45.1 % [40] |

> **Advertencia decisiva:** casi todas las cifras "titulares" de este documento se
> midieron en **esfuerzo máximo**. El *Coding Agent Index* = 80 es literalmente
> **"GPT-5.6 Sol con *max* reasoning"** [3][11]; el *Intelligence Index* usa
> **Sol (max) = 59** y **Fable 5 (Adaptive Reasoning, *Max Effort*) = 60** [9][39];
> el HLE de Opus 4.8 (45.7 %) es la corrida **"*Max Effort*"** [10][39]. Es decir:
> **los rankings reflejan el ajuste más caro y más lento de cada modelo**, no el de
> producción por defecto.

**Implicación práctica (regla de oro):** la recomendación unánime —de OpenAI y de
analistas independientes— es **"empezar bajo y subir solo si hace falta"**, porque
cada escalón multiplica coste y latencia con una ganancia de calidad decreciente
[35][37][38]. El esfuerzo es, por tanto, **otra palanca** (junto a la elección de
modelo) para mover el equilibrio precio/velocidad/calidad. Una guía sensata por
carga de trabajo del SDLC:

| Nivel de esfuerzo | Cuándo usarlo en el SDLC |
| --- | --- |
| `max` / `xhigh` / Deep Think | Arquitectura, *refactors* críticos, depuración difícil, razonamiento de requisitos complejos |
| `high` / `medium` (por defecto) | Codificación diaria, generación de pruebas, revisión de código estándar |
| `low` / `minimal` | Documentación, *boilerplate*, formateo, tareas de alto volumen y baja ambigüedad |

## 4. Los contendientes (familias de modelos, julio 2026)

### 4.1 Anthropic — Claude (familia Fable/Opus/Sonnet/Haiku)

- **Modelo insignia:** **Claude Fable 5** (`claude-fable-5`), GA el 9-jun-2026;
  "inteligencia de próxima generación para agentes de larga duración", con
  razonamiento adaptativo siempre activo [1][2]. **Claude Mythos 5** es su gemelo
  de máxima potencia, **solo por invitación** [2].
- **Gama:** **Opus 4.8** (coding agéntico complejo, *enterprise*), **Sonnet 5**
  (caballo de batalla, 1M de contexto), **Haiku 4.5** (el más rápido/barato) [1].
- **Contexto:** hasta **1M de tokens** en Fable 5 / Opus 4.8 / Sonnet 5 [1].
- **Perfil:** el más **inteligente** y el mejor en **calidad de código** y
  **autonomía de larga duración**; el más caro y de los más lentos en modo
  razonamiento.

### 4.2 OpenAI — GPT-5.6 (Sol/Terra/Luna)

- **Modelo insignia:** **GPT-5.6 Sol**, GA hacia el 9-jul-2026; "la mayor
  capacidad para coding complejo, uso de computadora, investigación y
  ciberseguridad" [3]. **Terra** (equilibrado) y **Luna** (económico/rápido)
  completan la familia [3].
- **Contexto:** **272K tokens** [3].
- **Perfil:** el mejor **agente** (líder del *Coding Agent Index* y de
  Terminal-Bench, SOTA en navegación y uso de computadora) y la **mejor relación
  valor/rendimiento** en la gama alta; contexto menor que sus rivales.

### 4.3 Google — Gemini 3.x (3.1 Pro / 3.5 Flash)

- **Modelos:** **Gemini 3.1 Pro** (`gemini-3.1-pro-preview`) para máxima
  capacidad y **Gemini 3.5 Flash** para velocidad/coste; cadena estable
  `gemini-2.5-pro/flash` [8][12]. **Ventana de 1M de tokens**.
- **Perfil:** el **más barato** de la gama frontera y el **más rápido** (Flash),
  con **contexto de 1M** y *grounding* nativo con Google Search; va por detrás en
  razonamiento puro y en autonomía agéntica. **Aviso:** a nivel de **producto
  agente**, Google está en transición de Gemini CLI a *Antigravity CLI* [33]; el
  **modelo** (vía Vertex AI/API) sigue plenamente vigente y competitivo.

### 4.4 Retadores y pesos abiertos (línea de referencia)

- **xAI Grok 4.5:** ~86.6 % en SWE-bench Verified y **contexto extremo (2M)**;
  fuerte para tareas de contexto masivo [22].
- **Pesos abiertos:** **DeepSeek V4 Pro** (~80.6 % SWE-bench Verified, líder
  open-weight), **Qwen3-Coder**, **Kimi K3** (especialista en *tool-calling* y
  adherencia a esquemas) [14][23]. Son la opción para **auto-hospedaje,
  soberanía de datos y coste marginal**, a cambio de asumir la operación.

## 5. Eje 1 — Inteligencia (razonamiento y conocimiento)

La "inteligencia" se aproxima con índices compuestos y exámenes frontera. La señal
más citada es el **Artificial Analysis Intelligence Index** (agrega ~9
evaluaciones de matemáticas, ciencia, código y razonamiento) [9].

| Modelo | Esfuerzo del test | AA Intelligence Index [9] | HLE [10] | SWE-bench Verified [13][14] | Lectura |
| --- | --- | --- | --- | --- | --- |
| **Claude Fable 5** | Adaptive · **Max Effort** [39] | **60** (líder) | **53.3 %** (líder) | **95.0 %** | El más inteligente y el mejor parcheando código |
| **GPT-5.6 Sol** | **`max`** reasoning [3][11] | 59 | 47.2 % | ~89 % | A un pelo en inteligencia; #1 como agente (§8) |
| Claude Opus 4.8 | Adaptive · **Max Effort** [10][39] | ~56 | 45.7 % | 88.6 % | "Todoterreno" de Anthropic |
| Gemini 3.1 Pro | `thinking_level: HIGH` / Deep Think [40] | ~54 (fuera del top-2) | (por debajo) | 80.6 % | Capaz, pero no rompe la frontera |
| Grok 4.5 | alto (n/d exacto) | ~55 | (n/d) | 86.6 % | Retador sólido, contexto 2M |
| DeepSeek V4 Pro | alto (n/d exacto) | ~53 | (n/d) | 80.6 % | Mejor peso abierto |

> **Dato clave [9]:** Fable 5 = **60** e índice de GPT-5.6 Sol = **59** (a ~⅓ del
> costo del primero) — **ambos en su esfuerzo máximo**. En SWE-bench Verified,
> **Claude Mythos 5** (restringido) reporta ~95.5 % y **Fable 5** ~95.0 % [13][14].

**Veredicto del eje:** **Claude Fable 5 lidera la inteligencia bruta** (Index 60,
HLE 53.3 %, SWE-bench ~95 %), con **GPT-5.6 Sol a 1 punto** en el índice compuesto
pero **a menor costo**. Gemini y los pesos abiertos quedan un escalón por debajo en
razonamiento frontera.

## 6. Eje 2 — Precio (coste por token y por tarea)

Precios de **API** por millón de tokens (MTok), entrada/salida [1][3][17][18].

| Modelo | Precio API (in / out) | Contexto | Posición de coste |
| --- | --- | --- | --- |
| Claude Fable 5 | **$10 / $50** | 1M | El más caro de la frontera |
| Claude Opus 4.8 | $5 / $25 | 1M | Alto |
| Claude Sonnet 5 | $3 / $15 | 1M | Medio |
| Claude Haiku 4.5 | $1 / $5 | 200K | Bajo |
| GPT-5.6 Sol | $5 / $30 | 272K | Medio-alto (pero eficiente en tokens) |
| GPT-5.6 Terra | $2.50 / $15 | 272K | Medio |
| GPT-5.6 Luna | $1 / $6 | 272K | Bajo |
| Gemini 3.1 Pro | ~$2 / $12 | 1M | **El más barato de la gama frontera** |
| Gemini 3.5 Flash | ~$1.50 / $9 | 1M | El más barato con calidad "flagship" |

> **La tarjeta de arriba es por token e independiente del esfuerzo.** Lo que cambia
> con el modo de esfuerzo ([§3.1](#31-el-eje-transversal-el-modo-de-esfuerzo-reasoning-effort))
> son los **tokens consumidos**; por eso la métrica que de verdad importa es el
> **coste por tarea**. Medido por Artificial Analysis en su Intelligence Index
> (todos a esfuerzo `max`) [11]:

| Modelo (esfuerzo `max`) | Coste por tarea [11] | Intelligence Index [11] | Lectura |
| --- | --- | --- | --- |
| Claude Fable 5 (max) | ~$3.1 (≈3× Sol)\* | 60 | Máxima calidad, máximo costo |
| **GPT-5.6 Sol (max)** | **$1.04** | 59 | ~⅓ del costo de Fable 5 a casi igual inteligencia |
| GPT-5.6 Terra (max) | $0.55 | 55 | ~50 % menos que Sol |
| GPT-5.6 Luna (max) | $0.21 | 51 | ~80 % menos que Sol; iguala a Gemini 3.5 Flash a menor costo |

\* Derivado: AA cifra a Sol (max) en "~⅓ del costo" de Fable 5 → Fable 5 ≈ 3 × $1.04 [11].

> **El esfuerzo mueve el coste ~3–5×.** Bajar de `max` a `medium`/`low` recorta el
> coste por tarea ~3–5× (menos tokens de razonamiento) [11][41][42]. En **coding**,
> Sol (max) resuelve el Coding Agent Index **~40 % más barato que Fable 5 (max)** y
> **~10 % más barato que Opus 4.8 (max)** [11]. Y en la familia GPT-5.6, **Luna y
> Sol dominan a Terra en la frontera de Pareto**: para cualquier nivel de Terra hay
> un nivel de Luna/Sol igual de inteligente y más barato [11].

**Veredicto del eje:** en **precio por token**, **Gemini** (3.1 Pro / 3.5 Flash)
es el más barato de la frontera; en **coste efectivo por tarea de coding**,
**GPT-5.6 Sol** ofrece el mejor valor de la gama alta; **Claude Fable 5** es el
más caro en ambos sentidos (se paga por la inteligencia y la fiabilidad).

## 7. Eje 3 — Rendimiento en tiempo (velocidad y latencia)

Dos métricas: **velocidad de salida** (tokens/segundo) y **latencia hasta el
primer token** (TTFT) [12][20][21].

| Modelo | Velocidad (tok/s) | TTFT aprox. | Nota |
| --- | --- | --- | --- |
| Gemini 3.5 Flash | **~284** | ~0.5 s | El más rápido de calidad "flagship" |
| GPT-5.6 Luna (xhigh) | ~208 | bajo | El "veloz" de OpenAI |
| Claude Haiku 4.5 | ~180 | **~0.6 s** | Mejor sensación interactiva |
| Claude Opus 4.8 | (medio) | ~0.75 s | TTFT bajo pese a razonar |
| GPT-5.4 | ~74 | ~0.8 s | — |
| Claude Fable 5 | ~67 (razonando) | (medio) | Insignia = más lento por "pensar" |
| Gemini 3.1 Pro (preview) | (medio) | ~9 s (prompt grande, razonando) | Latencia alta en razonamiento |

> **Compensación central:** los modelos **insignia con razonamiento adaptativo**
> (Fable 5, Sol, Gemini 3.1 Pro) sacrifican velocidad por profundidad; los
> **hermanos ligeros** (Flash, Luna, Haiku) recuperan la velocidad para tareas de
> alto volumen. Ojo: GPT-5.6 Sol, aun "razonando", **termina antes muchas tareas**
> por gastar menos tokens [3][11].

**La velocidad también depende del esfuerzo.** Las cifras de arriba son en modo
razonamiento (esfuerzo alto). Subir a `max` añade "pensamiento" y **puede ser
4–5× más lento que `low`** [41]; bajar el dial acelera el mismo modelo. Dentro de
GPT-5.6, a esfuerzo `max` la velocidad cae con el tamaño del submodelo [41]:

| Modelo (esfuerzo `max`) | Velocidad (tok/s) [41] |
| --- | --- |
| GPT-5.6 Luna (max) | ~199 |
| GPT-5.6 Terra (max) | ~145 |
| GPT-5.6 Sol (max) | ~54 |

Por eso "GPT-5.6 Sol" parece lento en tok/s brutos pero **termina antes muchas
tareas**: gasta ~15k tokens por tarea del Intelligence Index —menos que Opus 4.8
(max), GLM-5.2 (max) o Gemini 3.5 Flash (high)— [11].

**Veredicto del eje:** para **latencia/throughput puros**, **Google (Flash)**
gana, seguido de los ligeros de OpenAI/Anthropic (Luna, Haiku). Entre los
**insignia**, **GPT-5.6 Sol** ofrece el mejor tiempo *efectivo* por tarea;
**Claude Fable 5** es el más lento de los tres cerebros frontera.

## 8. Eje 4 — Precisión agéntica (tool-calling y autonomía)

Es el eje decisivo para el SDLC moderno: capacidad de **llamar herramientas con
fiabilidad**, encadenar muchas acciones sin perder el objetivo y operar en una
terminal/nube reales.

| Señal (fuente) | Ganador | Detalle |
| --- | --- | --- |
| **AA Coding Agent Index v1.1** (modelo en harness nativo) [11] | **GPT-5.6 Sol (`max`) = 80 (SOTA)** | +2.8 sobre Fable 5 (~77.2), con < ½ tokens y ~⅓ menos costo |
| **Terminal-Bench 2.x** (autonomía en terminal) [16] | **GPT-5.6 Sol** | ~88.8 % (single) / ~91.9 % (modo Ultra) |
| **BrowseComp** (navegación agéntica) [3] | **GPT-5.6 Sol = 92.2 % (SOTA)** | Investigación web multi-paso |
| **OSWorld 2.0** (uso de computadora) [3] | **GPT-5.6 Sol = 62.6 %** | Supera a Opus 4.8 con 85 % menos tokens |
| **Agents' Last Exam** (agéntico) [3] | **GPT-5.6 Sol = 53.6** | +13.1 sobre Fable 5 |
| **Cadenas largas de herramientas (20+ acciones), τ-bench** [22][24] | **Claude Fable 5** | No pierde el hilo en flujos secuenciales largos; >95 % en resultados verificados |
| **Adherencia a esquemas / function-calling puro** [23] | **Kimi K3** (open) | Especialista en orquestación multi-herramienta |

> **Todas estas cifras agénticas son en esfuerzo máximo** [3][11][39]: el índice de
> 80 es **Sol en `max`**; **Terra (`max`) = 77** y **Luna (`max`) = 75**, con costes
> por tarea ~60 % y ~80 % menores que Sol. Es decir, **el modo de esfuerzo y el
> submodelo mueven el resultado tanto como la marca del modelo**: Luna en `max`
> puede rivalizar con opciones más caras a una fracción del costo [11][36].

**Lectura matizada:** hay **dos "mejores" según el tipo de autonomía**:

- **GPT-5.6 Sol** domina la **amplitud agéntica**: terminal, navegador, uso de
  computadora y coding agéntico en harness nativo (SOTA en el *Coding Agent
  Index*) [3][11].
- **Claude Fable 5** domina la **profundidad y fiabilidad de larga duración**: no
  se desvía del objetivo en cadenas de muchas llamadas —clave para *refactors*
  multiarchivo y cambios de producción— [22].

**Veredicto del eje:** **GPT-5.6 Sol es el mejor agente** en la métrica más
representativa (Coding Agent Index = 80, SOTA), con **Claude Fable 5 empatado en
lo alto** para autonomía profunda y sostenida. Gemini queda por detrás.

## 9. Eje 5 — Privacidad y gobernanza empresarial

Regla de oro de 2026: **el mismo modelo se rige por términos de datos distintos
según la "puerta" de acceso** —app de consumo, API de desarrollador o *reseller*
en la nube (Bedrock/Vertex/Azure)— y hay **tres interruptores independientes:
entrenamiento, retención y confidencialidad en uso** [25].

### 9.1 ¿Entrenan con tus datos?

- **Vía empresarial/API de los tres proveedores: NO** por contrato (Anthropic
  Commercial Terms [4]; OpenAI API/Enterprise sin entrenamiento por defecto desde
  marzo-2023 [6]; Google API de pago y Vertex AI [8]).
- **La mina está en el consumo/gratuito:** Anthropic cambió el **default de
  consumo a *opt-out* a finales de 2025** (un ingeniero pegando código propietario
  en una cuenta Pro personal puede filtrar IP a un *pipeline* de entrenamiento de
  5 años); el tier gratuito de Google AI Studio y la app Gemini **sí** usan datos
  salvo desactivación (con excepción para EEE/Suiza/UK) [25][8].

### 9.2 ¿Qué guardan y por cuánto? (retención y ZDR)

- **Anthropic API:** auto-borrado a **30 días**; contenido marcado por política
  hasta 2 años y *scores* del clasificador hasta 7 años; **ZDR** disponible (no se
  almacena nada) [5][25].
- **OpenAI API:** hasta **30 días** para abuso, luego se borra; **pero un litigio
  puede congelar los logs**: en *NYT v. OpenAI* se ordenó preservar y producir
  ~20M de logs (nov-2025 / ene-2026). **Se salvaron: clientes ZDR, ChatGPT
  Enterprise y Edu**, porque nunca se almacenaron [7][25].
- **Google Vertex AI:** registro por periodo limitado para seguridad; no se usa
  para mejorar productos; DPA de Google Cloud con **residencia en la UE** [25].

> **Lección [25]:** "borrado a 30 días" es un **default, no un escudo** ante la
> justicia. Lo único que mantiene tus datos fuera de una orden de descubrimiento
> es **no almacenarlos** — eso es lo que compra **Zero Data Retention (ZDR)**.

### 9.3 Certificaciones, residencia y confidencialidad en uso

| Aspecto | Anthropic (Claude) | OpenAI (GPT) | Google (Gemini) |
| --- | --- | --- | --- |
| No-entrenamiento (empresa) | Contractual | Sí por defecto | Sí (API pago/Vertex) |
| ZDR disponible | Sí | Sí | Sí (según contrato) |
| SOC 2 Tipo II | Sí | Sí | Sí (Google Cloud) |
| ISO/IEC 42001 (gestión de IA) | Sí (pionero) | (parcial) | (Google Cloud) |
| HIPAA (BAA) | Sí, Enterprise/API | Sí, vía Azure | Sí, vía GCP |
| **FedRAMP** | No (jul-2026) | Sí, vía Azure | Sí, vía GCP |
| Residencia de datos | US/UE (AWS Bedrock) | La más granular (Azure) | UE y global (Vertex) |
| Confidential computing (TEE) | *White paper* publicado; disponibilidad a confirmar | Vía Azure confidential GPU | Vía GCP confidential GPU |

**Veredicto del eje:** **Anthropic es el más estricto "por defecto"** (no
entrenamiento contractual, ZDR, pionero en **ISO/IEC 42001** y con diseño de
inferencia confidencial publicado) [4][25][26]. **OpenAI y Google empatan justo
detrás** y **superan a Anthropic en cobertura gubernamental (FedRAMP)** y en
opciones de **residencia**, gracias a Azure y Google Cloud [25][27]. Para datos
regulados: **exige siempre DPA/BAA y verifica la "puerta" concreta**, no la marca.

## 10. Síntesis: ponderado global (scorecard)

Se normaliza cada eje a una escala **0–100** para el modelo insignia de cada
familia y se aplican pesos. **Los pesos son un juicio explícito y ajustable**; se
ofrecen **dos perfiles** para mostrar la sensibilidad del resultado.

### 10.1 Puntuaciones por eje (0–100)

| Eje | Claude Fable 5 | GPT-5.6 Sol | Gemini 3.1 Pro | Base de la puntuación |
| --- | --- | --- | --- | --- |
| Inteligencia | **100** | 95 | 84 | Index 60/59; HLE 53.3/47.2; SWE-bench [9][10][13] |
| Precisión agéntica | 94 | **100** | 77 | Coding Agent Index 80 SOTA; BrowseComp/OSWorld [11][3] |
| Precio / valor | 55 | 78 | **96** | $10/$50 vs $5/$30 vs ~$2/$12; coste/tarea [1][3][17] |
| Rendimiento en tiempo | 58 | 74 | **90** | tok/s y TTFT; eficiencia en tokens [12][20] |
| Privacidad empresarial | **96** | 88 | 86 | No-entrenamiento, ZDR, ISO 42001, FedRAMP [25][26] |

### 10.2 Ponderado — Perfil "SDLC equilibrado" (recomendado por defecto)

Pesos: **Inteligencia 22 % · Agéntica 24 % · Precio 20 % · Tiempo 14 % ·
Privacidad 20 %**.

<!-- ai-sdlc-dataset: id=llm-global-ranking schema=weighted-ranking unit=score-100 -->
| Puesto | Modelo | Puntuación ponderada |
| --- | --- | --- |
| 1.º | **GPT-5.6 Sol** | **88.5** |
| 2.º | **Gemini 3.1 Pro** | **86.0** |
| 3.º | **Claude Fable 5** | **82.9** |
<!-- /ai-sdlc-dataset -->

### 10.3 Ponderado — Perfil "Calidad crítica / ingeniería sensible"

Sube inteligencia, agéntica y privacidad; baja precio y tiempo. Pesos:
**Inteligencia 28 % · Agéntica 28 % · Privacidad 20 % · Precio 14 % · Tiempo
10 %**.

| Puesto | Modelo | Puntuación ponderada |
| --- | --- | --- |
| 1.º | **GPT-5.6 Sol** | **90.5** |
| 2.º | **Claude Fable 5** | **87.0** |
| 3.º | **Gemini 3.1 Pro** | **84.7** |

**Cómo leer el ponderado (importante):**

- **GPT-5.6 Sol gana ambos perfiles**: es el más **equilibrado** (top-2 en los
  cinco ejes y #1 en el más decisivo, la precisión agéntica). Es la **elección por
  defecto** para ingeniería de software en julio de 2026.
- **Claude Fable 5 y GPT-5.6 Sol están en un empate técnico de capacidad**: Fable 5
  **lidera inteligencia bruta, calidad de código y privacidad-por-defecto**, pero
  su **precio y su velocidad** lo penalizan en el ponderado equilibrado (donde
  precio+tiempo pesan 34 %). Sube al 2.º puesto en cuanto se prioriza la calidad.
- **Gemini 3.1 Pro es el campeón del *valor***: su bajo precio, alta velocidad y
  contexto de 1M lo empujan al 2.º puesto del perfil equilibrado, pese a no liderar
  ningún eje de capacidad pura.

> **Conclusión del ponderado:** **no hay un ganador absoluto**. Si hay que nombrar
> uno, **GPT-5.6 Sol** es el mejor LLM *generalista* para el SDLC por su
> equilibrio; **Claude Fable 5** es el mejor cuando mandan la **calidad, el
> razonamiento y la privacidad**; **Gemini** es el mejor cuando mandan **coste,
> velocidad y contexto**. La tabla por fase ([§11](#11-el-mejor-llm-por-fase-del-sdlc))
> convierte este matiz en recomendaciones accionables.

## 11. El mejor LLM por fase del SDLC

Aquí está el corazón del encargo. La lógica: cada fase estresa **ejes distintos**
(unas piden razonamiento y contexto; otras, autonomía en terminal; otras, coste y
volumen). El mapeo combina las fortalezas por eje (§5–§9) con el marco de
HackerRank **ASTRA**, que mide la aptitud de los modelos **por fase del SDLC** y
recuerda que **la especialización, no la dominancia universal, define 2026**
[29][30].

<!-- ai-sdlc-dataset: id=llm-sdlc-map schema=sdlc-map unit=categorical -->
<!-- ai-sdlc-table: {"rowHeader":"Fase del SDLC","essentialColumns":["Fase del SDLC","Mejor LLM","Por qué"],"initiallyHiddenColumns":["Clave de contexto","Candidatos"],"summaryColumns":["Mejor LLM"],"contentKinds":{"Clave de contexto":"data","Candidatos":"data","Fase del SDLC":"prose","Qué exige la fase":"prose","Mejor LLM":"data","Alternativa / económico":"data","Por qué":"prose"}} -->
| Clave de contexto | Candidatos | Fase del SDLC | Qué exige la fase | **Mejor LLM** | Alternativa / económico | Por qué |
| --- | --- | --- | --- | --- | --- | --- |
| `requisitos` | `primary:gpt-5-6-sol` | **1. Requisitos y especificación** | Comprensión de lenguaje natural ambiguo, razonamiento, ingerir mucha documentación de stakeholders, investigación de mercado/normativa | **GPT-5.6 Sol** (razonamiento) | **Gemini 3.1 Pro** (1M contexto + *grounding* con Google Search para requisitos investigados) | Razonamiento frontera para desambiguar y estructurar; Gemini si hay que leer corpus enormes o investigar en la web [3][8][29] |
| `diseno` | `primary:claude-fable-5` | **2. Diseño y arquitectura** | Razonamiento profundo, análisis de *trade-offs*, visión de sistema completo, contexto amplio | **Claude Fable 5** | GPT-5.6 Sol | Máxima inteligencia bruta (Index 60, HLE 53.3 %) + 1M de contexto para sostener todo el sistema en la cabeza [1][9][10] |
| `implementacion` | `co-primary:claude-fable-5;co-primary:gpt-5-6-sol` | **3. Codificación e implementación** | Parcheo correcto, *refactors* multiarchivo, autonomía en el repo | **Claude Fable 5** (calidad) / **GPT-5.6 Sol** (velocidad agéntica) | Sonnet 5; DeepSeek V4 Pro (open) | Fable 5 lidera SWE-bench (~95 %) y no se desvía en cadenas largas; Sol lidera el Coding Agent Index (80) con mejor coste/tarea [11][13][22] |
| `pruebas` | `primary:claude-sonnet-5` | **4. Pruebas y QA** | Fiabilidad/consistencia, cobertura de casos borde, alto volumen a bajo coste | **Claude Sonnet 5** | GPT-5.6 Terra; Haiku 4.5 | Claude destaca en consistencia y generación/explicación de pruebas; Sonnet 5 da 1M de contexto a precio medio [1][29][31] |
| `revision` | `co-primary:claude-fable-5;co-primary:claude-opus-4-8` | **5. Revisión de código** | Precisión, pocos falsos positivos, contexto de todo el repo | **Claude Fable 5 / Opus 4.8** | GPT-5.6 Sol (`@codex review` P0/P1) | Lidera SWE-bench Pro (80.3 %) y la comprensión de bases grandes; Sol filtra bien severidad en revisión [13][14][33] |
| `devops` | `primary:gpt-5-6-sol` | **6. DevOps / CI-CD / despliegue** | Autonomía en terminal real, IaC (YAML/Docker/K8s), recuperación de errores | **GPT-5.6 Sol** | Gemini 3.5 Flash (scripts baratos) | #1 en Terminal-Bench y uso de computadora (OSWorld); la fase más "agéntica de terminal" [3][11][16] |
| `documentacion` | `primary:gemini-3-1-pro` | **7. Documentación** | Escritura técnica clara, mucho volumen, coste/velocidad | **Gemini 3.1 Pro** | GPT-5.6 Luna; Claude Haiku 4.5 | 1M de contexto + bajo coste + alta velocidad para documentar repos enteros de forma económica [8][12] |
| `mantenimiento` | `primary:claude-fable-5` | **8. Mantenimiento y depuración** | Comprensión de código heredado, contexto masivo, depuración de larga duración | **Claude Fable 5** | Sonnet 5; Grok 4.5 (contexto 2M) | 1M de contexto + fiabilidad en cadenas largas sin perder el hilo; Grok si el repo excede 1M de tokens [1][22] |
<!-- /ai-sdlc-dataset -->

**Síntesis de la tabla:**

- **Claude Fable 5** es el rey de las fases de **calidad e inteligencia**: diseño,
  codificación de alta calidad, revisión y mantenimiento.
- **GPT-5.6 Sol** es el rey de las fases **agénticas y de terminal**: requisitos
  (razonamiento), codificación ágil y, sobre todo, **DevOps/despliegue**.
- **Gemini 3.x** es el rey de las fases **de volumen, coste y contexto**:
  documentación y apoyo a requisitos investigados; y su gama **Flash** es la
  opción económica transversal.

## 12. Conclusiones y recomendaciones

1. **No hay un único "mejor LLM".** El panorama de julio de 2026 premia la
   **especialización** [29][31]. Cualquier estrategia seria es **multi-modelo**:
   enrutar cada fase del SDLC al cerebro que mejor la sirve.
2. **Mejor generalista para el SDLC (ponderado):** **GPT-5.6 Sol** — gana ambos
   perfiles de ponderación por su equilibrio y su liderazgo en precisión agéntica
   (Coding Agent Index = 80, SOTA) [3][11].
3. **Mejor para calidad, razonamiento y privacidad-por-defecto:** **Claude
   Fable 5** — líder en inteligencia (Index 60), calidad de código (SWE-bench
   ~95 %) y política de datos (ZDR, ISO/IEC 42001) [9][13][25].
4. **Mejor para coste, velocidad y contexto:** **Gemini 3.1 Pro / 3.5 Flash** —
   el mejor valor de la frontera, con 1M de contexto [8][12][17].
5. **Retadores a vigilar:** **Grok 4.5** (contexto 2M) y los **pesos abiertos**
   (DeepSeek V4 Pro, Qwen3-Coder, Kimi K3) para **soberanía de datos y
   auto-hospedaje** [14][22][23].

**Recomendación por perfil de equipo:**

| Perfil / necesidad | Recomendación de modelo |
| --- | --- |
| Máximo equilibrio para todo el SDLC | **GPT-5.6 Sol** |
| Ingeniería crítica: calidad de código, refactors, arquitectura | **Claude Fable 5 (u Opus 4.8)** |
| Presupuesto ajustado / alto volumen / contexto enorme | **Gemini 3.1 Pro / 3.5 Flash** |
| Datos regulados con máxima confidencialidad por defecto | **Claude (Enterprise/API + ZDR)** |
| Sector público / FedRAMP | **GPT vía Azure** o **Gemini vía GCP** |
| Soberanía total / on-premise | **DeepSeek V4 Pro / Qwen3-Coder** (pesos abiertos) |
| Fases de terminal/DevOps | **GPT-5.6 Sol** |
| Documentación y QA de volumen | **Gemini 3.x** / **Claude Sonnet 5 / Haiku 4.5** |

> **Estrategia recomendada (multi-modelo):** usar **GPT-5.6 Sol** como cerebro por
> defecto (con **Terra/Luna** para abaratar), **Claude Fable 5/Sonnet 5** para
> diseño, revisión y código de producción, y **Gemini 3.x** para documentación,
> QA de volumen y trabajo de contexto masivo. Los **agentes** que orquestan estos
> modelos se comparan en los [documentos hermanos](_index.md).

## 13. Nota sobre la fiabilidad de los datos

- **Verificado en fuente primaria (alta confianza):** precios y contexto de Claude
  [1] y GPT-5.6 [3]; políticas de entrenamiento y retención de Anthropic [4][5],
  OpenAI [6][7] y Google [8]; el **Coding Agent Index = 80** de GPT-5.6 Sol,
  citado por OpenAI y Artificial Analysis [3][11]; el **Intelligence Index 60/59**
  (Fable 5 / Sol) [9].
- **Reportado por fabricante / agregador (usar con cautela):** las cifras de
  **SWE-bench Verified/Pro** (p. ej. Fable 5 ~95 %) usan *scaffolding* propio, **no
  son comparables entre fabricantes** y suelen quedar por encima de la línea base
  neutral de `swebench.com` [15]. Las de **Terminal-Bench 2.1** y **HLE** provienen
  de agregadores y *leaderboards* dinámicos [10][16].
- **Dependencia del modo de esfuerzo (crítico):** casi todas las cifras de
  inteligencia y agénticas de este documento son de **esfuerzo máximo**
  (`max` / *Max Effort* / *Deep Think*) [3][9][11][39], el ajuste **más caro y
  lento**. En producción con `high`/`medium` el coste y la latencia caen varias
  veces con una pérdida de calidad a menudo pequeña. El **ponderado**
  ([§10](#10-síntesis-ponderado-global-scorecard)) asume que **todos los modelos se
  comparan a un esfuerzo alto/comparable**; cambiar el esfuerzo de un modelo y no
  de otro invalidaría la comparación. Véase [§3.1](#31-el-eje-transversal-el-modo-de-esfuerzo-reasoning-effort).
- **Analítico, no medido:** la **tabla por fase del SDLC** ([§11](#11-el-mejor-llm-por-fase-del-sdlc))
  es una **extrapolación razonada** desde las fortalezas por eje hacia cada fase,
  anclada en el marco HackerRank ASTRA [29][30]; no es el resultado de un único
  benchmark "por fase". Trátese como **guía de decisión**, no como verdad absoluta.
- **Pesos del ponderado:** son un **juicio explícito** ([§10](#10-síntesis-ponderado-global-scorecard));
  cambiar los pesos cambia el orden. Se ofrecen dos perfiles precisamente para
  hacer visible esa sensibilidad.
- **Estado del producto vs. del modelo:** el **modelo Gemini** está plenamente
  vigente aunque el **agente Gemini CLI** esté en transición a Antigravity CLI
  [33]; no debe confundirse la salud del cerebro con la del andamiaje.
- **Corte temporal:** mediados de julio de 2026. El ecosistema cambia mes a mes;
  contrástense los *leaderboards* en vivo [9][12][15][16] y las páginas oficiales
  de precios/privacidad antes de decidir.

## 14. Referencias

**Fuentes oficiales / primarias**

1. Anthropic — *Models overview* (Fable 5, Opus 4.8, Sonnet 5, Haiku 4.5; precios y contexto). <https://platform.claude.com/docs/en/about-claude/models/overview>
2. Anthropic — *Introducing Claude Fable 5 and Claude Mythos 5* (9 jun 2026). <https://www.anthropic.com/news/claude-fable-5-mythos-5>
3. OpenAI — *GPT-5.6 has landed* (Sol/Terra/Luna; Coding Agent Index 80; BrowseComp/OSWorld; precios API). <https://openai.com/index/gpt-5-6/>
4. Anthropic — *Is my data used for model training?* (Commercial Terms). <https://privacy.claude.com/en/articles/7996868-is-my-data-used-for-model-training>
5. Anthropic — *How long do you store personal data?* (retención, ZDR). <https://privacy.anthropic.com/en/articles/7996866-how-long-do-you-store-personal-data>
6. OpenAI — *Your data* (retención API 30 días; sin entrenamiento por defecto). <https://platform.openai.com/docs/guides/your-data>
7. OpenAI — *Response to NYT data demands* (preservación de logs; 30 días restaurado). <https://openai.com/index/response-to-nyt-data-demands/>
8. Google — *Gemini API Additional Terms of Service* (tier gratuito entrena; excepción EEE/UK). <https://ai.google.dev/gemini-api/terms>

**Benchmarks y agregadores (inteligencia y rendimiento)**

9. Artificial Analysis — *Intelligence Index* (Fable 5 = 60; GPT-5.6 Sol = 59). <https://artificialanalysis.ai/evaluations/artificial-analysis-intelligence-index>
10. Artificial Analysis — *Humanity's Last Exam Leaderboard* (Fable 5 53.3 %). <https://artificialanalysis.ai/evaluations/humanitys-last-exam>
11. Artificial Analysis — *GPT-5.6 has landed* (Coding Agent Index v1.1; modelo en harness nativo). <https://artificialanalysis.ai/articles/gpt-5-6-has-landed>
12. Artificial Analysis — *LLM Leaderboard: models* (velocidad tok/s y latencia). <https://artificialanalysis.ai/leaderboards/models>
13. Vals AI — *SWE-bench Verified.* <https://www.vals.ai/benchmarks/swebench>
14. Morph LLM — *Best LLM for Coding (2026): 12 Models Ranked by SWE-bench and Cost per Task.* <https://www.morphllm.com/best-ai-model-for-coding>
15. SWE-bench — *Verified Leaderboard (línea base neutral).* <https://www.swebench.com/>
16. Terminal-Bench — *Leaderboard.* <https://www.tbench.ai/>

**Precios**

17. CostGoat — *LLM API Pricing Comparison & Cost Guide (Jul 2026).* <https://costgoat.com/compare/llm-api>
18. CometAPI — *The 2026 LLM API Pricing Comparison: GPT-5.5, Claude Sonnet 4.6, Gemini.* <https://www.cometapi.com/2026-llm-api-pricing-comparison-gpt-5-5-claude-gemini/>
19. IntuitionLabs — *LLM API Pricing 2026: OpenAI, Gemini, Claude & Grok.* <https://intuitionlabs.ai/articles/llm-api-pricing-comparison-2025>

**Velocidad y latencia**

20. Kunal Ganglani — *Fastest LLM API in 2026: Gemini vs OpenAI vs Claude Latency.* <https://www.kunalganglani.com/blog/llm-api-latency-benchmarks-2026>
21. AIMultiple — *LLM Latency Benchmark by Use Cases in 2026.* <https://aimultiple.com/llm-latency-benchmark>

**Capacidades agénticas (tool-calling / autonomía)**

22. WhatLLM — *Best Agentic AI Models in 2026: Ranked for Tool Use & Agents.* <https://whatllm.org/best-agentic-models>
23. LLM-Stats — *Best AI for Tool Calling 2026 — Top Function Calling Models.* <https://llm-stats.com/leaderboards/best-ai-for-tool-calling>
24. τ-bench (tau-bench) — *Tool-Agent-User benchmark.* <http://taubench.com/>

**Privacidad y gobernanza empresarial**

25. Axoflow — *Same model, three sets of rules: a 2026 privacy map for Claude, GPT, Gemini.* <https://axoflow.com/blog/privacy-map-for-claude-gpt-gemini-2026>
26. TygartMedia — *Claude Enterprise Compliance: BAA, SOC 2, GDPR and Data Policy (2026).* <https://tygartmedia.com/claude-enterprise-compliance/>
27. OpenEmpower — *Anthropic Claude Enterprise vs OpenAI: Which Do Regulated Teams Choose.* <https://www.openempower.com/blog/anthropic-claude-enterprise-vs-openai-which-regulated-teams-choose>
28. Datasumi — *Privacy Architectures and DPAs: OpenAI vs Anthropic 2026 Enterprise.* <https://www.datasumi.com/blog/privacy-architectures-openai-vs-anthropic-2026>

**LLMs en el ciclo SDLC**

29. HackerRank — *The state of frontier models across the SDLC.* <https://www.hackerrank.com/blog/the-state-of-frontier-models-across-the-sdlc/>
30. HackerRank — *ASTRA: An AI Benchmark for the SDLC.* <https://www.hackerrank.com/ai/leaderboard>
31. Nexos.ai — *Best LLMs for Coding and Software Development in 2026.* <https://nexos.ai/blog/best-llm-for-coding/>
32. VisionVix — *9 Best LLMs for Software Development in 2026.* <https://visionvix.com/best-llm-for-software-development/>

**Documentos hermanos (esta investigación)**

33. *Comparativa de Agentes de IA — Mono-LLM* (Claude Code, Codex CLI, Gemini CLI). [comparativa_agentes_ia_mono_llm.md](comparativa_agentes_ia_mono_llm.md)
34. *Comparativa de Agentes de IA — Multi-LLM* (Copilot CLI, Cursor CLI, Junie CLI, OpenCode). [comparativa_agentes_ia_multi_llm.md](comparativa_agentes_ia_multi_llm.md)

**Modos de esfuerzo (*reasoning effort*)**

35. The Decoder — *OpenAI staffer maps out which of GPT-5.6 Sol's five reasoning levels fits which task complexity.* <https://the-decoder.com/openai-staffer-maps-out-which-of-gpt-5-6-sols-five-reasoning-levels-fits-which-task-complexity/>
36. Sebastian Raschka — *GPT-5.6 Configurations and Defaults* (Sol/Terra/Luna × esfuerzo × 72 combinaciones). <https://sebastianraschka.com/blog/2026/gpt-5-6-configurations.html>
37. OpenAI — *Model guidance / latest model* (parámetro `reasoning_effort`, "empezar bajo y subir"). <https://developers.openai.com/api/docs/guides/latest-model>
38. Anthropic — *Adaptive thinking* (Platform Docs; `thinking:{type:"adaptive"}`, parámetro `effort`). <https://platform.claude.com/docs/en/build-with-claude/adaptive-thinking>
39. Artificial Analysis — *Claude Fable 5 (Adaptive Reasoning, Max Effort, Opus 4.8 Fallback).* <https://artificialanalysis.ai/models/claude-fable-5>
40. AI Free API — *Gemini API Thinking Level Guide (2.5 & 3 Pro): LOW/HIGH, Deep Think.* <https://www.aifreeapi.com/en/posts/gemini-api-thinking-level>
41. Originality.ai — *GPT-5.6 Sol vs Luna vs Terra Pricing Calculator* (coste y velocidad por esfuerzo). <https://originality.ai/blog/gpt-5-6-sol-vs-luna-vs-terra-pricing-calculator>
42. Eesel AI — *GPT-5.6 pricing (2026): Sol, Terra, and Luna costs explained.* <https://www.eesel.ai/blog/gpt-5-6-pricing>
