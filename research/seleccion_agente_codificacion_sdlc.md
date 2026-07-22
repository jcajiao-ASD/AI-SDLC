---
id: seleccion-agente-codificacion-sdlc
title: "Selección de un Agente de Codificación para el SDLC de un Ingeniero de Software"
slug: seleccion-agente-codificacion-sdlc
summary: "Sintetiza las comparativas de agentes y modelos para recomendar una herramienta según ecosistema, prioridades y coste."
category: seleccion
status: vigente
cutoffDate: "2026-07-20"
revalidateAfter: "2027-01-20"
evidenceLevel: mixta
decisionType: seleccion-agente
role: featured-source
featuredStory: seleccion-agente
---

# Selección de un Agente de Codificación para el SDLC de un Ingeniero de Software

[<- back](_index.md)

> **Estado:** Vigente. Decisión basada en la investigación con corte a **mediados
> de julio de 2026** (datos recogidos el 20 de julio de 2026).
> **Alcance:** este documento **no** vuelve a medir; **decide**. Sintetiza las tres
> investigaciones hermanas —[Mono-LLM](comparativa_agentes_ia_mono_llm.md),
> [Multi-LLM](comparativa_agentes_ia_multi_llm.md) y
> [LLMs por SDLC](comparativa_llms_sdlc.md)— para formular una **selección por
> perfil** y, para el perfil empresarial de referencia, una recomendación
> condicionada que cubra **todo el SDLC de punta a punta**.
> **Foco de la pregunta:** teniendo en cuenta la **calidad del agente** y **el o
> los modelos que tiene disponibles para el día a día**, ¿qué agente conviene
> según el ecosistema y las prioridades del equipo?

---

## Índice

1. [Objetivo y premisa rectora](#1-objetivo-y-premisa-rectora)
2. [Criterios de selección](#2-criterios-de-selección)
3. [Qué concluyó cada investigación (síntesis)](#3-qué-concluyó-cada-investigación-síntesis)
4. [El requisito compartido: la estrategia debe ser multi-modelo](#4-el-requisito-compartido-la-estrategia-debe-ser-multi-modelo)
5. [Descarte de los agentes mono-LLM para el SDLC de punta a punta](#5-descarte-de-los-agentes-mono-llm-para-el-sdlc-de-punta-a-punta)
6. [Comparación de los candidatos multi-LLM](#6-comparación-de-los-candidatos-multi-llm)
7. [La selección condicionada: Copilot CLI si GitHub es el centro](#7-la-selección-condicionada-copilot-cli-si-github-es-el-centro)
8. [Mapa accionable: qué modelo usar en cada fase del SDLC](#8-mapa-accionable-qué-modelo-usar-en-cada-fase-del-sdlc)
9. [La resiliencia como requisito compartido](#9-la-resiliencia-como-requisito-compartido)
10. [Contrapartidas honestas y complemento](#10-contrapartidas-honestas-y-complemento)
11. [Recomendación final por perfil](#11-recomendación-final-por-perfil)
12. [Nota de vigencia y fiabilidad](#12-nota-de-vigencia-y-fiabilidad)
13. [Referencias](#13-referencias)

---

## 1. Objetivo y premisa rectora

El encargo es **elegir una herramienta** —un agente de codificación— que permita
aplicar IA a lo largo de **todas las fases del SDLC** (requisitos, diseño,
codificación, pruebas, revisión, DevOps, documentación y mantenimiento), con la
mejor combinación de **calidad del agente** y **modelos disponibles** para el
trabajo diario. El agente **puede o no** estar atado a un único modelo.

Para el perfil empresarial de referencia, el documento debe producir una
selección concreta. Esa selección solo puede tratarse como predeterminada cuando
el ecosistema que la justifica sea también el sistema central del SDLC.

Toda la decisión se ancla en una **premisa rectora**, compartida por las tres
investigaciones [SDLC §12][Mono §9]:

> **No existe el mejor agente ni el mejor modelo.** Hoy el modelo/agente **X**
> puede ir en cabeza; en una semana **Y** puede tomar la delantera. Lo importante
> es entender que **existe un margen** para quedar atrás y **volver a ponerse al
> frente** — siempre que la herramienta lo permita.

Esta premisa no es un adorno: es el **criterio de diseño** de la selección. Una
herramienta que no permita cambiar de "cerebro" convierte cada relevo de liderazgo
del mercado en una **migración de herramienta**. Una que sí lo permita convierte
ese relevo en una operación más acotada. La premisa, por tanto, **delimita la
lista corta a agentes que desacoplen la herramienta del modelo**; no identifica
por sí sola cuál de ellos debe ganar.

## 2. Criterios de selección

Se evalúa cada candidato con cinco criterios, ponderados hacia el objetivo
("una herramienta para todo el SDLC"):

| # | Criterio | Por qué importa para el SDLC de punta a punta |
| --- | --- | --- |
| C1 | **Cobertura multi-modelo** (¿tiene los "cerebros" ganadores de cada fase?) | El SDLC óptimo es multi-modelo (§4); una sola herramienta debe poder invocarlos a todos |
| C2 | **Calidad del harness / agente** (Plan, autonomía, subagentes, recuperación) | Determina cuánto trabajo real y fiable ejecuta el agente por sí solo |
| C3 | **Integración con el SDLC** (issue → código → PR → revisión → despliegue) | "Punta a punta" exige cubrir el flujo completo, no solo escribir código |
| C4 | **Resiliencia ante el relevo de liderazgo** (cambiar de modelo sin cambiar de herramienta) | Materializa la premisa rectora (§1) |
| C5 | **Coste total de uso (entrada, consumo y gobernanza)** | Contrasta precio base, créditos/cuotas, mezcla de modelos y APIs/BYOK para estimar un TCO sostenible y apto para empresa |

## 3. Qué concluyó cada investigación (síntesis)

**[Investigación de LLMs por SDLC](comparativa_llms_sdlc.md) — los "cerebros":**
No hay un modelo que gane todo; **la especialización define 2026** [SDLC §11]. El
ponderado global corona a **GPT-5.6 Sol** como mejor **generalista** (líder en
precisión agéntica, *Coding Agent Index* = 80 SOTA), con **Claude Fable 5** como
rey de la **calidad/inteligencia** (Index 60, SWE-bench ~95 %, privacidad por
defecto) y **Gemini 3.x** como campeón del **coste/velocidad/contexto**. La
conclusión textual: *"Cualquier estrategia seria es multi-modelo: enrutar cada
fase del SDLC al cerebro que mejor la sirve"* [SDLC §12].

**[Investigación mono-LLM](comparativa_agentes_ia_mono_llm.md) — un cerebro por
agente:** **Codex CLI** (solo OpenAI) gana por estrecho margen en benchmarks de
terminal; **Claude Code** (solo Anthropic) lidera en ingeniería autónoma compleja;
**Gemini CLI** (solo Google) **está siendo descontinuado para individuos** hacia
Antigravity CLI [Mono §4.3][Mono §9]. La advertencia central: los tres comparten el
**riesgo estructural del *vendor lock-in***, que Gemini CLI **acaba de
ejemplificar** [Mono §10].

**[Investigación multi-LLM](comparativa_agentes_ia_multi_llm.md) — un cerebro
intercambiable:** **Copilot CLI** es la opción **más equilibrada y con mejor DX
GitHub-céntrica**, con el **menor precio mensual de entrada ($10)** entre los
planes comerciales comparados; **Cursor** es una alternativa general fuerte para
una experiencia IDE-first, Jira, BYOK y catálogo frontera nativo; **Junie** se
alinea con organizaciones JetBrains; y **OpenCode** es el más abierto (BYOK total,
modelos locales, MIT), aunque requiere pagar el consumo de API/BYOK [Multi
§9][Multi §10]. Los cuatro permiten cambiar de modelo, por lo que esa capacidad
compartida no establece un ganador universal.

## 4. El requisito compartido: la estrategia debe ser multi-modelo

Los tres documentos convergen en un mismo punto. Ese punto **crea la lista
corta**, pero no resuelve por sí solo la selección:

1. **Ninguna fase del SDLC tiene el mismo ganador.** La tabla por fase de la
   investigación de LLMs asigna cerebros **distintos** a fases distintas
   [SDLC §11]: Fable 5 para diseño/calidad/revisión/mantenimiento, GPT-5.6 Sol
   para requisitos/agéntico/DevOps, Gemini 3.x para documentación y volumen.
2. **La premisa rectora lo refuerza en el tiempo:** aunque hoy esa asignación sea
   la óptima, el liderazgo **rota semana a semana** [SDLC §12][Mono §9].
3. **Conclusión operativa:** para cubrir el SDLC de punta a punta —y **seguir
   cubriéndolo** cuando el liderazgo rote— la herramienta **no puede estar atada a
   un solo modelo**. Debe ser **multi-LLM**.

Es decir: el criterio **C1 (cobertura multi-modelo)** no es un lujo, es un
**requisito** que se deriva directamente de la evidencia. Esto **filtra el campo**
y deja como candidatos a Copilot, Cursor, Junie y OpenCode; no prueba que Copilot
sea el ganador. La decisión posterior depende del *harness*, la integración, la
gobernanza, el precio y, sobre todo, el ecosistema real del equipo.

## 5. Descarte de los agentes mono-LLM para el SDLC de punta a punta

Los agentes mono-proveedor son excelentes —de hecho, marcan la **línea de
referencia de rendimiento** [Multi §5]—, pero **fallan el requisito C1** para el
objetivo concreto de "una herramienta para todo el SDLC":

| Agente mono-LLM | Cerebro único | Qué le falta para el SDLC completo |
| --- | --- | --- |
| **Codex CLI** | Solo GPT (OpenAI) | Sin Fable 5 para diseño/calidad ni Gemini para documentación/volumen [Mono §4.2] |
| **Claude Code** | Solo Claude (Anthropic) | Sin GPT-5.6 Sol para DevOps/terminal ni Gemini para coste/volumen [Mono §4.1] |
| **Gemini CLI** | Solo Gemini (Google) | Va por detrás en las tres métricas **y está en *sunset*** para individuos [Mono §4.3] |

Cubrir todas las fases con mono-LLM exigiría **operar 2–3 herramientas a la vez**
(Codex CLI + Claude Code + algo para Gemini), lo que **contradice el encargo de
"una herramienta"** y multiplica la fricción, el coste y la superficie de
*lock-in*. Además, el ***sunset* de Gemini CLI es un caso verificado** que ilustra
el riesgo de apostar todo a un solo proveedor [Mono §4.3][Mono §10]. **Se
descartan como herramienta única para este objetivo.**

> Nota: siguen siendo válidos como **complemento especializado** para quien ya vive
> en un solo ecosistema (p. ej. Claude Code para *refactors* de producción). Pero
> no como la **única** herramienta de punta a punta.

## 6. Comparación de los candidatos multi-LLM

Filtrado el campo a los agentes multi-LLM, se comparan según los criterios de §2.
Un primer chequeo —¿qué agente tiene disponibles los tres cerebros ganadores por
fase (Fable 5, GPT-5.6 Sol, Gemini 3.x)— arroja un resultado **verificado contra
fuentes oficiales** (acceso 20-jul-2026) que conviene subrayar: **los cuatro los
alcanzan**, de forma **nativa** o vía **BYOK**. Es decir, la cobertura de modelos
frontera **crea la lista corta y ya no es el diferenciador**; la elección depende
de la integración, el *harness*, la gobernanza, el precio y el ecosistema:

<!-- ai-sdlc-dataset: id=agent-candidate-matrix schema=candidate-matrix unit=mixed -->
| Candidato | ¿Tiene Fable 5? | ¿Tiene GPT-5.6 Sol? | ¿Tiene Gemini 3.x? | Harness / SDLC | Entrada / consumo |
| --- | --- | --- | --- | --- | --- |
| **Copilot CLI** | Sí | Sí | Sí (3.1 Pro, 3.5 Flash) | Plan + Autopilot + agentes Task/Explore/Review/Plan + *fleet*; **integración GitHub nativa issue→PR** | **$10/mes (Pro)**; incluye 1.500 AI Credits/mes |
| **OpenCode** | Vía BYOK | Vía BYOK | Vía BYOK | Multi-agente, LSP, Plan/Build; **local-first**, 75+ proveedores | **Software gratis (MIT)**; API/BYOK de pago |
| **Cursor CLI** | Nativo | Nativo (Sol/Terra/Luna) | Nativo (3.1 Pro, 3.5 Flash) | Composer 2.5 propio + *cloud agents* + BYOK; integración Jira | $20 |
| **Junie CLI** | Nativo | Limitado: vía BYOK (nativo ≤ GPT-5.5) | Nativo (3.1 Pro, 3.5 Flash) | Modo Plan + **JetBrains** + BYOK/OpenRouter; líder SWE-Rebench | $100/año + IDE |
<!-- /ai-sdlc-dataset -->

Fuentes del catálogo y capacidades: [Multi §4.1][Multi §4.2][Multi §4.3][Multi
§4.4][Multi §6][Multi §8]. **Verificación de los catálogos de Cursor y Junie contra
fuentes oficiales (acceso 20-jul-2026):** Cursor —*Modelos y precios*
(<https://cursor.com/es/docs/models-and-pricing>)— y JetBrains AI —*Supported
models* (<https://www.jetbrains.com/help/ai-assistant/supported-llms.html>)—, más la
documentación de BYOK de Junie CLI.

**Lectura (corregida tras verificación):**

- **La cobertura de los tres cerebros frontera es un mínimo común, no un
  diferenciador.** **Cursor** los lista **de forma nativa** (Claude Fable 5, GPT-5.6
  Sol/Terra/Luna, Gemini 3.1 Pro/3.5 Flash) además de BYOK; **Junie** trae **Fable 5
  y Gemini 3.x nativos** en el catálogo de JetBrains AI y alcanza **GPT-5.6 vía
  BYOK/OpenRouter** (su máximo OpenAI nativo es GPT-5.5); **Copilot CLI** los conmuta
  con `/model`; **OpenCode** los alcanza vía BYOK. **Los cuatro pueden ejecutar la
  estrategia multi-modelo de [SDLC §11].**
- **Por eso la elección se decide en el ajuste al perfil:** para equipos
  GitHub-céntricos, **Copilot CLI** destaca por el flujo *issue→PR* nativo, la
  gobernanza empresarial y el **menor precio mensual de entrada ($10)** entre los
  planes comerciales comparados. Esto **no garantiza el menor coste total**: el
  TCO depende del consumo, los modelos y los servicios externos. OpenCode es
  gratis como software, pero requiere pagar las APIs/BYOK que utilice [Multi
  §7][Multi §9].
- **Cursor es una alternativa general, no solo de nicho:** puede ser preferible
  cuando pesan más la experiencia IDE-first, Jira, BYOK, Composer y el catálogo
  frontera nativo, aunque su plan de entrada sea **$20**.
- **Alineación de ecosistema:** **Junie** brilla dentro de JetBrains y necesita
  BYOK para GPT-5.6; **OpenCode** maximiza apertura y BYOK, a cambio de gestionar
  claves y proveedores [Multi §4.2][Multi §4.3][Multi §4.4][Multi §7].

## 7. La selección condicionada: Copilot CLI si GitHub es el centro

**Selección para el perfil empresarial de referencia:
[GitHub Copilot CLI](comparativa_agentes_ia_multi_llm.md#41-github-copilot-cli)**
como agente **único y principal**, bajo una condición explícita: **GitHub debe ser
el sistema central del SDLC** —issues, repositorios, PRs, revisión y políticas—.
Bajo esa condición, la decisión se sostiene en los cinco criterios de §2:

- **C1 — Cobertura multi-modelo (requisito cumplido; ya *no* es el diferenciador):**
  su catálogo incluye **Claude (Fable 5, Opus 4.8, Sonnet 5, Haiku 4.5)**, **GPT-5.6
  (Sol/Terra/Luna)** y **Gemini (3.1 Pro, 3.5 Flash)** [Multi §4.1], conmutables con
  `/model`, y puede ejecutar la estrategia multi-modelo de [SDLC §11]. **Matiz
  honesto (verificado, §6):** Cursor, Junie y OpenCode **también** cumplen C1, así
  que el catálogo no constituye una ventaja exclusiva de Copilot CLI.
- **C2 — Calidad del harness:** modo **Plan** (plan revisable antes de ejecutar),
  modo **Autopilot** (autonomía para tareas de confianza), **agentes
  especializados** (Task, Explore, Review, Plan), **delegación en segundo plano** y
  **ejecución paralela / *fleet*** multi-repo [Multi §4.1][Multi §8]. Conjunto
  agéntico completo y maduro, aunque no exclusivo del mercado.
- **C3 — Integración con el SDLC:** es especialmente fuerte **si el flujo vive en
  GitHub** —*issue → PR*, revisión de PRs, resúmenes de *diffs*, políticas por
  organización, ZDR y auditoría— [Multi §4.1][Multi §9]. Esta es la razón
  principal de la selección condicionada.
- **C4 — Resiliencia ante el relevo de liderazgo:** Copilot cumple el requisito al
  cambiar entre los modelos de su catálogo con `/model`; Cursor, Junie y OpenCode
  también ofrecen conmutación multi-modelo y alternativas BYOK (§9). Por tanto,
  C4 valida la lista corta, no una ventaja exclusiva.
- **C5 — Coste total de uso y gobernanza:** **Copilot Pro cuesta $10 USD/mes**, el
  menor precio mensual de entrada entre los planes comerciales comparados. Desde
  el **1-jun-2026**, los planes mensuales usan **GitHub AI Credits**: cada crédito
  equivale a **$0.01**, y Pro incluye **1.500 al mes** (**1.000 base + 500
  flex**) que **no se acumulan**. Copilot CLI, Chat y *cloud agent* consumen
  créditos; las *completions* y *next edit suggestions* siguen ilimitadas y no
  los consumen. En planes pagos, la selección automática de modelo aplica un
  **10 % de descuento** al coste del modelo. Los planes anuales heredados
  conservan temporalmente las solicitudes prémium hasta expirar, pero no reciben
  modelos ni funciones nuevos. Por ello, el TCO depende del uso y de la mezcla de
  modelos, no solo de la tarifa base; a ello se suma la gobernanza de nivel
  empresa [Multi §7][Multi §9] (§13, refs. 6–9).

En términos de la fórmula de las investigaciones,
`resultado ≈ calidad_del_harness × calidad_del_modelo_elegido` [Multi §3]: Copilot
CLI aporta un **harness sólido y bien integrado con GitHub** y permite elegir el
modelo por fase, igual que los demás candidatos de la lista corta por catálogo
nativo o BYOK. Si GitHub **no** es el sistema central, no se selecciona Copilot
por defecto: debe realizarse una **evaluación o piloto entre Cursor y la
herramienta alineada al ecosistema** —Junie para JetBrains u OpenCode cuando
dominen BYOK y apertura—.

## 8. Mapa accionable: qué modelo usar en cada fase del SDLC

Este mapa es una estrategia de enrutamiento, **no una capacidad exclusiva de
Copilot CLI**. En el perfil GitHub-céntrico se ejecuta con `/model`; la misma ruta
principal puede implementarse en **Cursor** con su catálogo nativo, en **Junie**
con catálogo nativo más BYOK/OpenRouter y en **OpenCode** mediante BYOK. Cambian
la sintaxis, la gobernanza y el coste, no el mapa de modelos [Multi
§4.1][Multi §4.2][Multi §4.3][Multi §4.4].

| Fase del SDLC | Modelo recomendado | Alternativa económica | Por qué (según [SDLC §11]) |
| --- | --- | --- | --- |
| **1. Requisitos** | **GPT-5.6 Sol** | Gemini 3.1 Pro | Razonamiento frontera para desambiguar; Gemini si hay corpus enorme/investigación web |
| **2. Diseño y arquitectura** | **Claude Fable 5** | GPT-5.6 Sol | Máxima inteligencia bruta (Index 60) + contexto de 1M para sostener el sistema entero |
| **3. Codificación** | **Claude Fable 5** (calidad) / **GPT-5.6 Sol** (velocidad agéntica) | Claude Sonnet 5 | Fable 5 lidera SWE-bench (~95 %); Sol lidera el *Coding Agent Index* con mejor coste/tarea |
| **4. Pruebas y QA** | **Claude Sonnet 5** | GPT-5.6 Terra / Haiku 4.5 | Consistencia y cobertura de casos borde; 1M de contexto a precio medio |
| **5. Revisión de código** | **Claude Fable 5 / Opus 4.8** | GPT-5.6 Sol (agente **Review**) | Lidera SWE-bench Pro (80.3 %); Copilot añade su agente de revisión nativo |
| **6. DevOps / CI-CD** | **GPT-5.6 Sol** | Gemini 3.5 Flash | #1 en Terminal-Bench y uso de computadora; la fase más "agéntica de terminal" |
| **7. Documentación** | **Gemini 3.1 Pro** | GPT-5.6 Luna / Haiku 4.5 | 1M de contexto + bajo coste + alta velocidad para documentar repos enteros |
| **8. Mantenimiento y depuración** | **Claude Fable 5** | Claude Sonnet 5 | 1M de contexto + fiabilidad en cadenas largas sin perder el hilo |

**Segunda palanca — el modo de esfuerzo:** además de elegir modelo, ajusta el
*reasoning effort* por carga de trabajo [SDLC §3.1]: `max`/`xhigh` para
arquitectura y depuración difícil; `high`/`medium` para codificación y revisión
diarias; `low`/`minimal` para documentación y *boilerplate*. Regla de oro:
**"empezar bajo y subir solo si hace falta"** [SDLC §3.1].

> **Nota honesta:** para la fase 8, la investigación sugiere **Grok 4.5 (contexto
> 2M)** si el repo excede 1M de tokens [SDLC §11]; Grok **no está** en el catálogo
> de Copilot CLI. Es un caso de borde poco frecuente: los modelos superiores del
> catálogo (Fable 5 / Sonnet 5) ya ofrecen **1M de tokens**, suficiente para la
> inmensa mayoría de repos. Si alguna vez se supera ese techo, Grok 4.5 es un
> **modelo en la nube** accesible vía BYOK (**sin hardware propio**) desde una
> herramienta con soporte para ese proveedor, como Junie u OpenCode (§10).

## 9. La resiliencia como requisito compartido

La premisa rectora (§1) valida la **categoría multi-LLM**, no un producto
específico:

- **Cambio de modelo:** Copilot conmuta dentro del catálogo de GitHub; Cursor
  combina catálogo nativo y BYOK; Junie combina JetBrains AI y BYOK/OpenRouter; y
  OpenCode enruta mediante BYOK. Los cuatro reducen la dependencia de un solo
  proveedor [Multi §4][Multi §6].
- **Resiliencia acotada, no absoluta:** cambiar de modelo depende de que esté
  disponible en el catálogo o proveedor, de cuotas, políticas, compatibilidad y
  calidad de integración. Un relevo puede requerir reconfiguración, validación o
  incluso cambiar de herramienta si el candidato elegido no incorpora el nuevo
  líder.
- **Riesgo de plataforma:** el ***sunset* de Gemini CLI** [Mono §4.3] ilustra por
  qué conviene diversificar modelos, pero la propia herramienta multi-LLM también
  puede cambiar sus precios, catálogo o condiciones. La resiliencia exige
  gobernanza, portabilidad y un plan de salida, además de conmutación.

En resumen: **C4 es un requisito compartido de la lista corta**. Su grado se
compara por amplitud del catálogo, BYOK, portabilidad y políticas; no constituye
por sí solo un argumento exclusivo a favor de Copilot.

## 10. Contrapartidas honestas y complemento

Ninguna elección es perfecta; estas son las **debilidades reconocidas** de Copilot
CLI y cómo se mitigan [Multi §9]:

| Debilidad | Impacto para el SDLC | Mitigación |
| --- | --- | --- |
| **Score bruto en Terminal-Bench ligeramente inferior** (~68–72 % vs ~75–78 % de OpenCode) | Menor en la práctica: depende del modelo emparejado y la diferencia es pequeña | Enrutar la fase 6 (DevOps) a **GPT-5.6 Sol**, el mejor en terminal [SDLC §8] |
| **BYOK restringido al catálogo de GitHub** (solo modelos alojados por GitHub) | Puede ser relevante si se necesita un modelo *cloud* no listado, control de claves o portabilidad entre proveedores | Evaluar **Cursor, Junie u OpenCode**, que ofrecen BYOK con distintos grados de apertura [Multi §4.2][Multi §4.3][Multi §4.4] |
| **Muy optimizado para el ecosistema GitHub** | Resta flexibilidad fuera de flujos GitHub | Aceptable solo si GitHub es central; si no, pilotar Cursor y la herramienta alineada al ecosistema |

**Contexto de esta empresa — sin hardware para IA:** dado que **no hay planes de
montar infraestructura propia** para correr modelos grandes, el eje *local-first /
self-hosting* **no aplica** y **no es un criterio de selección aquí**. Tampoco
favorece exclusivamente a Copilot: **Copilot, Cursor y Junie operan con modelos
cloud**, y **OpenCode puede consumirlos por BYOK**, sin desplegar ni operar
servidores de GPU. La ausencia de hardware deja la decisión en la integración,
la gobernanza, el BYOK, la experiencia de uso y el coste.

**Alternativas BYOK para modelos fuera del catálogo de GitHub:** si hiciera falta
un modelo *cloud* concreto (p. ej. Grok 4.5 vía la API de xAI para repos > 1M
tokens), **Junie** o
[OpenCode](comparativa_agentes_ia_multi_llm.md#44-opencode) pueden cubrir ese
ejemplo; **Cursor** sigue siendo alternativa BYOK para los proveedores y modelos
que soporte. OpenCode es gratis (MIT) como software; en todos los casos se paga
el consumo del proveedor de API/BYOK. Copilot CLI puede bastar por sí solo **bajo
la condición GitHub-céntrica** y mientras su catálogo cubra las necesidades.

## 11. Recomendación final por perfil

<!-- ai-sdlc-dataset: id=agent-profile-recommendations schema=profile-recommendation unit=categorical -->
| Perfil del equipo / necesidad | Herramienta seleccionada |
| --- | --- |
| **GitHub es el sistema central del SDLC** y se priorizan issue→PR, gobernanza y el menor precio mensual de entrada entre los planes comerciales comparados | **GitHub Copilot CLI** (opción predeterminada) |
| Prioriza experiencia **IDE-first**, Jira, BYOK y catálogo frontera nativo | **Cursor** (alternativa general) |
| La organización vive en el ecosistema JetBrains | **Junie CLI** |
| Prioriza máxima apertura, BYOK total o control de proveedores | **OpenCode** |
| GitHub no es central y no existe una alineación clara | **Piloto entre Cursor y la herramienta alineada al ecosistema** (Junie para JetBrains u OpenCode para BYOK/apertura) |
| Necesita un modelo *cloud* fuera del catálogo de la herramienta principal | **Cursor, Junie u OpenCode**, según catálogo, BYOK y ecosistema |
| Solo trabaja con un proveedor y prioriza integración vertical | **Codex CLI** (OpenAI) o **Claude Code** (Anthropic) como caso especial, asumiendo el *lock-in* |
<!-- /ai-sdlc-dataset -->

**Veredicto condicionado:** no existe un ganador universal. Para el perfil
empresarial de referencia, se selecciona **GitHub Copilot CLI solo si GitHub es el
sistema central del SDLC**; en ese caso su flujo issue→PR, gobernanza y plan de
pago con **menor precio mensual de entrada ($10)** entre los planes comerciales
comparados justifican la preferencia. Esto no garantiza el menor coste total: el
coste efectivo depende del consumo de AI Credits, los modelos elegidos y las
posibles APIs externas empleadas como complemento o mediante BYOK. Si esa
condición no se cumple, el documento exige una **evaluación o piloto entre Cursor
y la herramienta alineada al ecosistema** antes de decidir. Cursor puede ser
preferible como opción general IDE-first/Jira/BYOK, y Junie para organizaciones
JetBrains. La falta de hardware propio no altera este veredicto: los candidatos
operan con modelos *cloud* de forma nativa o mediante BYOK.

## 12. Nota de vigencia y fiabilidad

- **Esta selección es una decisión, no una medición.** Se apoya en las tres
  investigaciones hermanas; su fiabilidad hereda la de ellas (ver sus respectivas
  secciones "Nota sobre la fiabilidad de los datos").
- **La premisa rectora aplica también a este documento:** el veredicto es válido
  **con corte a mediados de julio de 2026**. Lo que **no** caduca es el
  **criterio**: elegir una herramienta **multi-LLM** que desacople el trabajo del
  modelo. Aunque el criterio se mantiene, los cambios de catálogo, BYOK, precios,
  facturación, cuotas, créditos, integraciones o ecosistema **pueden cambiar el
  ganador específico**.
- **Revisión recomendada:** reevaluar los **catálogos de modelos** de la lista
  corta, sus opciones BYOK, integraciones, precios, esquemas de facturación,
  cuotas, créditos incluidos/consumidos y los *leaderboards* en vivo cada pocas
  semanas [SDLC §13][Mono §11][Multi §11].
- **Estado del producto vs. del modelo:** recuérdese que el **modelo Gemini** sigue
  vigente aunque el **agente Gemini CLI** esté en *sunset* [Mono §4.3][SDLC §13];
  por eso Gemini 3.x sigue siendo una opción válida **dentro** de agentes
  multi-LLM como Copilot, Cursor, Junie u OpenCode.

## 13. Referencias

Este documento es un **entregable de decisión** derivado de las tres
investigaciones hermanas; toda cifra y afirmación se sustenta en ellas y en sus
referencias primarias:

1. *Comparativa de LLMs para Ingeniería de Software en el Ciclo SDLC* — ponderado
   de 5 ejes y mejor modelo por fase.
   [comparativa_llms_sdlc.md](comparativa_llms_sdlc.md) — citado como **[SDLC §n]**.
2. *Comparativa de Agentes de IA — Mono-LLM* (Claude Code, Codex CLI, Gemini CLI).
   [comparativa_agentes_ia_mono_llm.md](comparativa_agentes_ia_mono_llm.md) —
   citado como **[Mono §n]**.
3. *Comparativa de Agentes de IA — Multi-LLM* (Copilot CLI, Cursor CLI, Junie CLI,
   OpenCode).
   [comparativa_agentes_ia_multi_llm.md](comparativa_agentes_ia_multi_llm.md) —
   citado como **[Multi §n]**.
4. Cursor — *Modelos y precios*.
   <https://cursor.com/es/docs/models-and-pricing>.
5. JetBrains AI — *Supported models*.
   <https://www.jetbrains.com/help/ai-assistant/supported-llms.html>.
6. GitHub Docs — *Plans for GitHub Copilot*.
   <https://docs.github.com/en/copilot/get-started/plans>.
7. GitHub Docs — *Usage-based billing for individuals*.
   <https://docs.github.com/en/copilot/concepts/billing/usage-based-billing-for-individuals>.
8. GitHub Docs — *Models and pricing for GitHub Copilot*.
   <https://docs.github.com/en/copilot/reference/copilot-billing/models-and-pricing>.
9. GitHub Blog — *GitHub Copilot is moving to usage-based billing*.
   <https://github.blog/news-insights/company-news/github-copilot-is-moving-to-usage-based-billing/>.

> Para las fuentes primarias (anuncios oficiales, *leaderboards*, políticas de
> privacidad y precios), véanse las secciones **Referencias** de cada documento
> hermano.
