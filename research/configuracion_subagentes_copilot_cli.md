---
id: configuracion-subagentes-copilot-cli
title: "Configuración de Modelos para los Subagentes de GitHub Copilot CLI"
slug: configuracion-subagentes-copilot-cli
summary: "Propone una configuración multi-modelo para subagentes de Copilot CLI según velocidad, precisión, complejidad y seguridad."
category: seleccion
status: vigente
cutoffDate: "2026-07-21"
revalidateAfter: "2027-01-21"
evidenceLevel: mixta
decisionType: configuracion-subagentes
role: catalog
---

# Configuración de Modelos para los Subagentes de GitHub Copilot CLI

[<- volver al índice](_index.md)

> **Estado:** Vigente. Corte temporal: **21 de julio de 2026**.
>
> **Decisión:** usar una configuración multi-modelo por función, no un único
> modelo para todos los subagentes. La configuración propuesta prioriza velocidad
> en exploración y ejecución rutinaria, capacidad agéntica en trabajo complejo,
> precisión en revisión y evidencia específica en seguridad.
>
> **Advertencia metodológica:** no existe un benchmark público que compare todas
> estas combinaciones dentro del harness de Copilot CLI. La recomendación combina
> hechos oficiales sobre los roles y modelos, benchmarks de modelo y una
> inferencia operativa explícita para emparejarlos.

---

## Índice

1. [Objetivo](#1-objetivo)
2. [Qué se está configurando](#2-qué-se-está-configurando)
3. [Configuración recomendada](#3-configuración-recomendada)
4. [Configuración aplicable en Copilot CLI](#4-configuración-aplicable-en-copilot-cli)
5. [Justificación por subagente](#5-justificación-por-subagente)
6. [Reglas de escalamiento](#6-reglas-de-escalamiento)
7. [Trazabilidad de la evidencia](#7-trazabilidad-de-la-evidencia)
8. [Limitaciones y vigencia](#8-limitaciones-y-vigencia)
9. [Fuentes](#9-fuentes)

---

## 1. Objetivo

Este documento convierte la investigación previa sobre modelos y la selección de
GitHub Copilot CLI en una configuración operativa para sus subagentes
incorporados:

- `explore`
- `task`
- `general-purpose`
- `rubber-duck`
- `code-review`
- `research`
- `security-review`

La recomendación responde cuatro preguntas por subagente:

1. ¿Qué modelo debe usar por defecto?
2. ¿Cuánto esfuerzo de razonamiento necesita?
3. ¿Cuándo necesita contexto ampliado?
4. ¿Cuándo debe escalar o cambiar de modelo?

La configuración parte de tres conclusiones de la investigación local:

- El resultado depende tanto del modelo como del harness:
  `resultado ≈ calidad_del_modelo × calidad_del_harness` [L1].
- No existe un modelo que domine todas las fases del SDLC; una estrategia seria
  debe enrutar cada carga al modelo que mejor la sirve [L1, L3].
- Copilot CLI es una buena selección para equipos GitHub-céntricos porque combina
  un harness con subagentes, ejecución paralela e integración `issue → PR`, y
  permite cambiar de modelo sin migrar de herramienta [L2, L3].

## 2. Qué se está configurando

### 2.1 Modelo, harness y subagente

- **Modelo:** el LLM que aporta razonamiento, generación y uso de herramientas.
- **Harness:** Copilot CLI, que administra permisos, contexto, herramientas y
  delegación.
- **Subagente:** un proceso especializado con contexto separado y una función
  concreta dentro del harness.

Asignar el mismo modelo a todos los subagentes desaprovecha esta especialización.
Por ejemplo, `explore` necesita velocidad y lectura eficiente, mientras que
`security-review` necesita razonamiento profundo y alta confianza.

### 2.2 Roles oficiales

GitHub documenta los siguientes comportamientos [G1, G2, G7]:

| Subagente | Función oficial relevante para la decisión |
| --- | --- |
| `explore` | Exploración rápida y ligera del código; solo lectura. |
| `task` | Ejecuta pruebas, builds, linters, formateadores e instalaciones; resume el éxito y conserva el detalle del fallo. |
| `general-purpose` | Tiene capacidades similares al agente principal y un contexto separado para trabajo complejo. |
| `rubber-duck` | Critica planes, código y pruebas usando automáticamente un modelo diferente al de la sesión. |
| `code-review` | Revisa diffs con alta relación señal/ruido; no comenta estilo ni modifica archivos. |
| `research` | Realiza investigación exhaustiva sobre código, repositorios, web y arquitectura, con fuentes. Solo se invoca mediante `/research`; el agente principal no lo activa automáticamente [G1]. |
| `security-review` | Revisa cambios locales buscando vulnerabilidades explotables de alta confianza en 11 categorías y solo informa hallazgos con más de 80 % de confianza; no sustituye una auditoría completa [G7]. |

La clave operativa correcta es **`explore`**, no `explorer`.

### 2.3 Valores de fábrica

La referencia de comandos publica los modelos predeterminados de los agentes
incorporados [G7]:

| Subagente | Modelo predeterminado |
| --- | --- |
| `explore`, `task`, `research` | Claude Haiku 4.5 |
| `general-purpose`, `code-review`, `security-review` | Claude Sonnet 4.5 |
| `rubber-duck` | Modelo complementario seleccionado dinámicamente |

La propuesta de este documento reemplaza deliberadamente la mayoría de esos
valores para especializar velocidad, capacidad agéntica, revisión y seguridad.
Los valores de fábrica siguen siendo una alternativa conservadora respaldada por
GitHub.

### 2.4 Parámetros persistentes

Copilot CLI permite configurar cada subagente en `subagents.agents` mediante
[G3]:

| Clave | Valores relevantes | Uso |
| --- | --- | --- |
| `model` | Identificador de modelo o `inherit` | Selecciona el LLM. |
| `effortLevel` | `low`, `medium`, `high`, `xhigh` o `inherit` | Controla el esfuerzo de razonamiento. |
| `contextTier` | `default`, `long_context` o `inherit` | Selecciona el nivel de contexto. |

Estas son las claves de configuración de **Copilot CLI**. Los nombres
`reasoning_effort` y `context_tier` corresponden a otras superficies de
invocación o APIs y no deben copiarse a `settings.json`.

## 3. Configuración recomendada

| Subagente | Modelo | `effortLevel` | `contextTier` | Escalamiento o alternativa |
| --- | --- | --- | --- | --- |
| **`explore`** | **Gemini 3.5 Flash** | `low` | `default` | Usar `long_context` solo para exploración transversal de monorepos; alternativa: GPT-5.6 Luna. |
| **`task`** | **GPT-5.6 Luna** | `low` | `default` | Cambiar a GPT-5.6 Terra `medium` si el trabajo pasa de ejecutar a diagnosticar fallos complejos. |
| **`general-purpose`** | **GPT-5.6 Sol** | `medium` | `default` | Subir a `high` y `long_context` para refactors multiarchivo o tareas largas; alternativa de calidad: Claude Opus 4.8. |
| **`rubber-duck`** | **Selección automática de Copilot CLI** | Automático | Automático | No fijar un modelo: GitHub selecciona deliberadamente otra familia respecto de la sesión. Solo está disponible cuando la sesión principal usa Claude o GPT [G2]. |
| **`code-review`** | **Claude Opus 4.8** | `high` | `default` | Usar `long_context` en diffs grandes o cuando sea necesario leer dependencias fuera del diff; Sonnet 5 para revisiones rutinarias. |
| **`research`** | **GPT-5.6 Sol** | `high` | `long_context` | Gemini 3.1 Pro como alternativa para corpus muy grandes o flujos que prioricen tool precision; sigue en public preview. |
| **`security-review`** | **GPT-5.6 Sol** | `xhigh` | `default` | Activar `long_context` para cambios extensos; usar Opus 4.8 como segunda revisión manual de hallazgos críticos. |

### Lectura ejecutiva

- **Velocidad y volumen:** Gemini 3.5 Flash y GPT-5.6 Luna.
- **Trabajo agéntico complejo:** GPT-5.6 Sol.
- **Revisión de alta precisión:** Claude Opus 4.8.
- **Crítica independiente:** selector dinámico de `rubber-duck`.
- **Seguridad:** GPT-5.6 Sol a máximo esfuerzo documentado por Copilot CLI
  (`xhigh`), con verificación cruzada humana o de otra familia para hallazgos
  críticos.

## 4. Configuración aplicable en Copilot CLI

La forma recomendada de aplicar la configuración es mediante `/subagents`, porque
el selector valida los modelos disponibles para el plan y la versión instalada.
La configuración equivalente en `settings.json` es:

```jsonc
{
  "subagents": {
    "agents": {
      "explore": {
        "model": "gemini-3.5-flash",
        "effortLevel": "low",
        "contextTier": "default"
      },
      "task": {
        "model": "gpt-5.6-luna",
        "effortLevel": "low",
        "contextTier": "default"
      },
      "general-purpose": {
        "model": "gpt-5.6-sol",
        "effortLevel": "medium",
        "contextTier": "default"
      },
      "code-review": {
        "model": "claude-opus-4.8",
        "effortLevel": "high",
        "contextTier": "default"
      },
      "research": {
        "model": "gpt-5.6-sol",
        "effortLevel": "high",
        "contextTier": "long_context"
      },
      "security-review": {
        "model": "gpt-5.6-sol",
        "effortLevel": "xhigh",
        "contextTier": "default"
      }
    }
  }
}
```

`rubber-duck` se omite intencionalmente. GitHub documenta que elige
automáticamente un modelo que contraste con el modelo de la sesión y vuelve a
seleccionarlo si el usuario cambia de modelo [G2]. Fijarlo globalmente eliminaría
esa propiedad. Actualmente solo está disponible si el modelo principal pertenece
a las familias Claude o GPT [G2].

Los ajustes pueden guardarse con distinto alcance [G3]:

- Usuario: `~/.copilot/settings.json`.
- Repositorio: `.github/copilot/settings.json`.
- Personal y local: `.github/copilot/settings.local.json`.

Antes de copiar el JSON manualmente, se debe confirmar en `/subagents` que los
identificadores coinciden con el catálogo de la versión instalada. La
disponibilidad también depende del plan y de las políticas de la organización
[G4].

## 5. Justificación por subagente

### 5.1 `explore`: Gemini 3.5 Flash

**Razón funcional.** `explore` busca símbolos, archivos y relaciones básicas sin
modificar el repositorio. Su valor depende de responder rápido y mantener limpio
el contexto principal [G1].

**Razón del modelo.** GitHub clasifica Gemini 3.5 Flash como modelo para ayuda
rápida y tareas simples o repetitivas [G5]. La investigación local también lo
ubica entre las opciones de mayor velocidad y mejor costo para trabajo de
volumen [L1].

**Razón de parámetros.** `low/default` evita pagar razonamiento o contexto que
normalmente no mejoran una búsqueda puntual. `long_context` solo agrega valor
cuando la pregunta obliga a correlacionar muchas áreas del repositorio.

**Tipo de sustento:** rol y perfil del modelo oficiales; el emparejamiento es una
inferencia operativa.

### 5.2 `task`: GPT-5.6 Luna

**Razón funcional.** `task` existe para ejecutar comandos verbosos y devolver un
resultado compacto, no para diseñar una solución o realizar un refactor [G1].

**Razón del modelo.** GitHub describe GPT-5.6 Luna como rápido, eficiente en
costo y apropiado para tareas pequeñas o repetitivas [G5]. Esto coincide con la
ejecución rutinaria de pruebas, builds y linters.

**Razón de parámetros.** `low/default` es suficiente cuando el comando solo debe
ejecutarse y resumirse. Si aparece un fallo ambiguo, la carga deja de ser
rutinaria: debe cambiarse a Terra `medium` o delegarse el diagnóstico a
`general-purpose`.

**Tipo de sustento:** rol y perfil del modelo oficiales; el emparejamiento es una
inferencia operativa.

### 5.3 `general-purpose`: GPT-5.6 Sol

**Razón funcional.** Este agente conserva capacidades similares a las del agente
principal y se utiliza cuando una tarea necesita contexto separado, varias
herramientas o ejecución paralela [G1].

**Razón del modelo.** GitHub recomienda GPT-5.6 Sol para razonamiento profundo,
depuración, bases de código grandes y trabajo agéntico prolongado [G5]. OpenAI
reporta liderazgo en su familia en coding, uso de terminal, navegación y trabajo
agéntico [O1]. La investigación local lo selecciona como mejor generalista
ponderado para el SDLC [L1, L3].

**Razón de parámetros.** `medium/default` aplica la regla de empezar con el menor
esfuerzo suficiente. Los resultados públicos destacados suelen medirse con
esfuerzo superior; por ello no se afirma que `medium` replique esos resultados.
Se escala a `high/long_context` cuando la tarea realmente abarca varios módulos o
una cadena larga de herramientas.

**Tipo de sustento:** perfil oficial y benchmarks de modelo; `medium/default`
como baseline es una decisión operativa.

### 5.4 `rubber-duck`: selección automática

**Razón funcional y de modelo.** GitHub indica explícitamente que `rubber-duck`
usa un modelo diferente al que dirige la sesión. El objetivo es reducir puntos
ciegos, sesgos y modos de fallo compartidos [G2].

Por tanto, no debe fijarse Sonnet, GPT o Gemini como valor global. Si la sesión
usa Claude, Copilot puede escoger GPT; si el usuario cambia el modelo de sesión,
la siguiente invocación vuelve a elegir un crítico apropiado [G2].

Esta capacidad solo está disponible cuando la sesión principal usa un modelo
Claude o GPT. Una sesión dirigida por Gemini u otra familia no debe asumir que
podrá invocar `rubber-duck` [G2].

**Tipo de sustento:** comportamiento oficial directo; no es una inferencia.

### 5.5 `code-review`: Claude Opus 4.8

**Razón funcional.** `code-review` busca bugs, vulnerabilidades, condiciones de
carrera, fugas de memoria y errores lógicos, y evita comentarios de estilo para
mantener una relación señal/ruido alta [G1].

**Razón del modelo.** GitHub y Anthropic posicionan Opus 4.8 para razonamiento
complejo, depuración y coding agéntico empresarial [G5, A1]. La investigación
local asigna la revisión de código a la línea Claude de alta capacidad por su
calidad de código y comprensión de bases grandes [L1].

Los benchmarks de parcheo como SWE-bench no miden directamente la precisión de
comentarios de revisión. Por ello, Opus 4.8 es una recomendación razonada, no un
ganador demostrado específicamente para `code-review`.

**Razón de parámetros.** `high/default` prioriza precisión sin cargar
automáticamente todo el repositorio. `long_context` se reserva para diffs grandes
o dependencias relevantes fuera del cambio. Sonnet 5 es una alternativa menos
costosa para revisiones rutinarias.

**Tipo de sustento:** capacidad oficial del modelo y evidencia indirecta de
coding; el emparejamiento es inferencial.

### 5.6 `research`: GPT-5.6 Sol

**Razón funcional.** `research` realiza búsquedas profundas en código, GitHub y
web, contrasta fuentes y entrega un informe con citas [G1].

**Razón del modelo.** OpenAI reporta 92,2 % en BrowseComp para GPT-5.6 Sol y
mejoras en navegación, herramientas y trabajo profesional de larga duración
[O1]. Estas capacidades se alinean directamente con una investigación de varios
pasos. La investigación local también lo recomienda para requisitos y
desambiguación, mientras reserva Gemini para corpus amplios [L1].

**Razón de parámetros.** `high/long_context` permite conservar documentos y
comparar evidencia sin fragmentar prematuramente la investigación.

**Alternativa.** Gemini 3.1 Pro es apropiado cuando se priorizan ciclos
edit-test, precisión de herramientas o un corpus amplio [G5]. Se mantiene como
alternativa, no como segundo modelo simultáneo, y debe considerarse su estado
**public preview** en Copilot [G4].

**Tipo de sustento:** rol oficial, benchmark declarado por el proveedor e
inferencia operativa.

### 5.7 `security-review`: GPT-5.6 Sol

**Razón funcional.** `security-review` busca vulnerabilidades explotables y de
alta confianza en los cambios locales. Es una revisión focalizada, no una
garantía de seguridad ni una auditoría integral.

**Razón del modelo.** Entre los modelos evaluados, GPT-5.6 Sol tiene la evidencia
pública más directamente relacionada con ciberseguridad. OpenAI reporta 73,5 %
en ExploitBench, 71,2 % en SEC-Bench Pro y mejoras en ExploitGym, además de
capacidad para revisión segura, parcheo y modelado de amenazas [O1]. Son cifras
del proveedor y no una comparación independiente dentro de Copilot CLI.

**Razón de parámetros.** Se recomienda `xhigh`, que es el nivel máximo
documentado para `effortLevel` en la configuración persistente de Copilot CLI
[G3]. No se utiliza `max`, porque no figura entre los valores documentados para
esta clave. `default` limita costo y latencia en diffs normales; se activa
`long_context` cuando el flujo vulnerable atraviesa numerosos archivos.

**Verificación cruzada.** Un hallazgo crítico debe confirmarse manualmente y, si
es posible, mediante una segunda ejecución con otra familia, por ejemplo Opus
4.8. Esto es una regla de aseguramiento propuesta, no una capacidad simultánea de
`subagents.agents`.

**Tipo de sustento:** datos de seguridad declarados por el proveedor; la
asignación y la segunda pasada son decisiones operativas.

## 6. Reglas de escalamiento

### 6.1 Regla general

Empezar con el nivel mínimo que satisfaga el rol y escalar solo ante evidencia de
que falta capacidad. El esfuerzo alto consume más créditos, aumenta latencia y
no garantiza una mejora proporcional [L1, G6].

### 6.2 Señales de escalamiento

| Subagente | Señal | Acción |
| --- | --- | --- |
| `explore` | La respuesta requiere correlacionar numerosos módulos. | Mantener Flash y cambiar a `long_context`; usar Sol si además exige razonamiento profundo. |
| `task` | Un comando falla repetidamente y el log no identifica la causa. | Cambiar a Terra `medium` o delegar diagnóstico a `general-purpose`. |
| `general-purpose` | Refactor multiarchivo, requisitos ambiguos o cadena larga de herramientas. | Sol `high/long_context`; considerar Opus 4.8 para priorizar calidad de parcheo. |
| `code-review` | Diff grande o dependencia crítica fuera del diff. | Opus 4.8 `high/long_context`; revisión secundaria si el impacto es alto. |
| `research` | Decisión difícil de revertir o corpus excepcionalmente grande. | Conservar `high/long_context`; comparar con Gemini 3.1 Pro u otra familia. |
| `security-review` | Flujo fuente-sumidero distribuido o hallazgo crítico. | Sol `xhigh/long_context`, segunda revisión y validación humana. |

### 6.3 Reglas que no deben romperse

- No fijar manualmente el modelo de `rubber-duck` salvo que GitHub cambie su
  comportamiento documentado.
- No interpretar `long_context` como sinónimo de mayor calidad: solo evita
  truncamiento o fragmentación cuando existe material suficiente.
- No comparar benchmarks sin comprobar el nivel de esfuerzo usado.
- No presentar una segunda familia como ejecución simultánea automática:
  `subagents.agents` configura un modelo por agente.
- No considerar `security-review` sustituto de análisis estático, pruebas de
  seguridad, revisión humana o pentesting autorizado.

## 7. Trazabilidad de la evidencia

**Clasificación:**

- **O:** evidencia oficial directa sobre rol, disponibilidad o capacidad.
- **B:** benchmark o medición de modelo; puede ser del proveedor o agregador.
- **I:** inferencia operativa que traslada la evidencia al subagente.

| Recomendación | O | B | I | Confianza |
| --- | :---: | :---: | :---: | --- |
| Flash para `explore` | Sí | Secundaria | Sí | Alta para velocidad; media para el emparejamiento exacto. |
| Luna para `task` | Sí | Secundaria | Sí | Alta para costo/rapidez; media para diagnóstico de fallos. |
| Sol para `general-purpose` | Sí | Sí | Sí | Alta. |
| Selector automático para `rubber-duck` | Sí | No requerido | No | Muy alta. |
| Opus 4.8 para `code-review` | Sí | Indirecta | Sí | Media-alta; no existe benchmark específico de review en Copilot CLI. |
| Sol para `research` | Sí | Sí, BrowseComp | Sí | Alta, con cautela por ser benchmark declarado por el proveedor. |
| Sol para `security-review` | Sí | Sí, seguridad | Sí | Alta como candidato; no demuestra ausencia de falsos negativos. |

## 8. Limitaciones y vigencia

1. **No hay benchmark por subagente.** No se midió `explore + Flash` contra
   `explore + Luna`, ni las demás parejas, dentro del mismo harness de Copilot
   CLI.
2. **Modelo y harness no son intercambiables.** Un benchmark de API o de otro
   agente no predice exactamente el resultado de Copilot CLI.
3. **Los benchmarks de fabricantes requieren cautela.** Las cifras de GPT-5.6
   citadas son útiles como señales, pero no sustituyen una evaluación neutral.
4. **El catálogo cambia.** GitHub advierte que los modelos pueden reemplazarse o
   actualizarse, y su disponibilidad depende del plan y las políticas [G4].
5. **Los identificadores pueden cambiar.** `/subagents` es la fuente operativa
   para validar el nombre aceptado por la versión instalada.
6. **El costo real en Copilot usa AI Credits.** Los precios API orientan el
   posicionamiento relativo, pero no deben trasladarse directamente al costo de
   una sesión de Copilot CLI [G6].
7. **Revalidación recomendada:** revisar trimestralmente, o inmediatamente
   después de cambios en el catálogo, los roles, los parámetros o las políticas
   de modelos.

## 9. Fuentes

### 9.1 Documentos locales

- **[L1]** [Comparativa de LLMs para Ingeniería de Software en el Ciclo SDLC](comparativa_llms_sdlc.md):
  metodología, esfuerzo, velocidad, precisión agéntica, mejor modelo por fase y
  limitaciones.
- **[L2]** [Comparativa de Agentes de IA con Planes Multi-LLM](comparativa_agentes_ia_multi_llm.md):
  capacidades de Copilot CLI y distinción modelo/harness.
- **[L3]** [Selección de un Agente de Codificación para el SDLC](seleccion_agente_codificacion_sdlc.md):
  selección condicionada de Copilot CLI y estrategia multi-modelo.

### 9.2 GitHub Copilot CLI y modelos

- **[G1]** GitHub Docs, [About custom agents: Built-in agents](https://docs.github.com/en/copilot/concepts/agents/copilot-cli/about-custom-agents#built-in-agents).
- **[G2]** GitHub Docs, [About the rubber duck agent](https://docs.github.com/en/copilot/concepts/agents/copilot-cli/rubber-duck).
- **[G3]** GitHub Docs, [GitHub Copilot CLI configuration directory](https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-config-dir-reference#configuration-file-settings):
  `subagents.agents`, `model`, `effortLevel`, `contextTier` y alcances de
  `settings.json`.
- **[G4]** GitHub Docs, [Supported AI models in GitHub Copilot](https://docs.github.com/en/copilot/reference/ai-models/supported-models).
- **[G5]** GitHub Docs, [AI model comparison](https://docs.github.com/en/copilot/reference/ai-models/model-comparison).
- **[G6]** GitHub Docs, [Models and pricing for GitHub Copilot](https://docs.github.com/en/copilot/reference/copilot-billing/models-and-pricing).
- **[G7]** GitHub Docs, [GitHub Copilot CLI command reference](https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-command-reference):
  comandos, modelos predeterminados y descripción de `security-review`.
- GitHub Docs, [Research agent](https://docs.github.com/en/copilot/concepts/agents/copilot-cli/research).
- GitHub Docs, [Agentic code review](https://docs.github.com/en/copilot/how-tos/copilot-cli/use-copilot-cli/agentic-code-review).

### 9.3 Proveedores de modelos

- **[O1]** OpenAI, [GPT-5.6](https://openai.com/index/gpt-5-6/):
  capacidades agénticas, BrowseComp, coding, tool use y evaluaciones de
  ciberseguridad. Las puntuaciones son publicadas por OpenAI.
- **[A1]** Anthropic, [Models overview](https://platform.claude.com/docs/en/about-claude/models/overview):
  posicionamiento de Claude Opus 4.8, Sonnet 5 y Haiku 4.5.
- Google DeepMind, [Gemini 3.5 Flash model card](https://deepmind.google/models/model-cards/gemini-3-5-flash/).
- Google AI, [Gemini 3.1 Pro](https://ai.google.dev/gemini-api/docs/models/gemini-3.1-pro-preview).
