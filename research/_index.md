# AI-SDLC — Índice de Investigación

Bienvenido. Este espacio recopila investigaciones sobre el uso de Inteligencia
Artificial en el ciclo de vida del desarrollo de software (AI-SDLC): agentes de
codificación, modelos, benchmarks y herramientas asociadas.

---

> **Tip:**
> Si buscas algo específico, usa los títulos de sección como referencia rápida.
> Cada documento incluye su propio índice interno y una sección de **Referencias**
> que sustenta la información con fuentes verificables.

## 1. Agentes de IA para Codificación

- [Comparativa de Agentes de IA con Planes Multi-LLM](comparativa_agentes_ia_multi_llm.md) — Copilot CLI vs. Cursor CLI vs. Junie CLI vs. OpenCode (corte: 22 de julio de 2026).
- [Comparativa de Agentes de IA con un Único Proveedor de LLM](comparativa_agentes_ia_mono_llm.md) — Claude Code vs. Codex CLI vs. Gemini CLI: ¿cuál es el mejor agente mono-proveedor? (corte: julio 2026).

## 2. Modelos (LLMs)

- [Comparativa de LLMs para Ingeniería de Software en el Ciclo SDLC](comparativa_llms_sdlc.md) — Claude Fable 5 vs. GPT-5.6 Sol vs. Gemini 3.1 Pro (y retadores): ponderado de 5 ejes (precio, inteligencia, privacidad, tiempo y precisión agéntica) y mejor modelo por fase del SDLC (corte: julio 2026).

## 3. Selección y Decisión

- [Selección de un Agente de Codificación para el SDLC](seleccion_agente_codificacion_sdlc.md) — decisión por perfil basada en las tres investigaciones: **Copilot CLI** como opción predeterminada solo para equipos GitHub-céntricos; **Cursor** para IDE-first/Jira/BYOK, **Junie** para JetBrains y **OpenCode** para máxima apertura; incluye mapa de modelo por fase del SDLC (corte: 22 de julio de 2026).
- [Configuración de Modelos para los Subagentes de GitHub Copilot CLI](configuracion_subagentes_copilot_cli.md) — configuración recomendada y sustentada para `explore`, `task`, `general-purpose`, `rubber-duck`, `code-review`, `research` y `security-review`, con parámetros, escalamiento, trazabilidad y fuentes (corte: julio 2026).
- [Agentes Personalizados en GitHub Copilot CLI](agentes_personalizados_copilot_cli.md) — investigación sobre definición, beneficios, riesgos, relación con skills y MCP, roadmap, benchmarks, evaluación interna y portafolio piloto recomendado (corte: julio 2026).

## 4. Integraciones y Protocolos

- [Model Context Protocol (MCP) para agentes de codificación y el SDLC](investigacion_mcp_sdlc.md) — investigación académica e industrial sobre arquitectura, beneficios, métricas, seguridad, creación y futuro de MCP; incluye evaluación y arquitectura recomendada para Jira, GitHub, SonarQube y AWS/GCP (corte: 21 de julio de 2026).

## 5. Metodologías y Frameworks de Desarrollo Agéntico

- [Comparación de skills para un SDLC asistido por IA: OpenSpec vs. GitHub Spec Kit vs. Superpowers vs. Open GSD](comparacion-skills-sdlc.md) — evaluación de doble lente sobre 100: perfil primario de **adopción progresiva y liderada por humanos** (65 % flexibilidad, integración progresiva, intervención humana, onboarding, facilidad de uso y bajo contexto/tokens; 35 % piso de calidad) que prioriza **OpenSpec (66,1)** seguido de Spec Kit (59,6), Superpowers (54,4) y GSD Core (47,8), con **requisito de gobernanza externa** (ramas protegidas, PR/revisión humana, CI, `validate --strict`, `verify` por política); y lente secundaria de piso de calidad (control/precisión/organización/efectividad) donde GSD Core lidera (67,8). Incluye punto de equilibrio, recomendaciones por escenario, pila empresarial, compatibilidad por agente y piloto de adopción por fases (corte: 22 de julio de 2026).
- [GitHub Spec Kit para desarrollo agéntico de software](Spec-Kit.md) — investigación sobre SDD, flujo, comandos, artefactos, persistencia, compatibilidad, seguridad y evidencia; incluye piloto controlado y comparación con OpenSpec, GSD Core y Superpowers (corte: 21 de julio de 2026).
- [Superpowers para desarrollo agéntico de software](Superpowers.md) — investigación sobre arquitectura, workflow, hard gates, TDD, subagentes, métricas, compatibilidad, evidencia y riesgos; incluye comparación con OpenSpec y GSD Core y propuesta de piloto (corte: 21 de julio de 2026).
- [OpenSpec para un SDLC basado en GitHub Copilot](OpenSpec.md) — capa ligera de especificaciones y changes persistentes para desarrollo spec-driven (corte: 20 de julio de 2026).
- [Open GSD y GSD Core para un SDLC basado en GitHub Copilot](OpenGSD.md) — framework de context engineering y ciclo agentivo completo con planificación persistente, subagentes, verificación y ship (corte: 20 de julio de 2026).
- [Open GSD vs. OpenSpec para un SDLC centrado en GitHub Copilot](OpenGSD-vs-OpenSpec.md) — comparación de propósito, ceremonia, persistencia, verificación, Git y estrategia de adopción (corte: 20 de julio de 2026).
