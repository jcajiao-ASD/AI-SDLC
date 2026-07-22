---
id: github-spec-kit
title: "GitHub Spec Kit para desarrollo agéntico de software"
slug: github-spec-kit
summary: "Investiga Specification-Driven Development con GitHub Spec Kit, sus artefactos, persistencia, seguridad y evidencia."
category: metodologias
status: vigente
cutoffDate: "2026-07-21"
revalidateAfter: "2027-01-21"
evidenceLevel: mixta
decisionType: evaluacion-framework
role: catalog
---

# GitHub Spec Kit para desarrollo agéntico de software

[<- volver al índice](_index.md)

> **Fecha de corte:** 21 de julio de 2026.  
> **Estado:** investigación vigente al corte; versiones, integraciones y métricas
> de adopción deben revalidarse antes de una decisión.
>
> **Conclusión de evidencia:** **no se encontraron ensayos controlados,
> benchmarks independientes ni estudios longitudinales que aíslen el efecto
> causal de GitHub Spec Kit** sobre productividad, calidad, seguridad, costo o
> tiempo de entrega. Sus mecanismos son plausibles y su adopción pública es
> alta, pero esas señales no prueban eficacia.

## Resumen ejecutivo

[GitHub Spec Kit](https://github.com/github/spec-kit) es un toolkit abierto,
licenciado bajo MIT, para aplicar **Specification-Driven Development (SDD)** con
agentes de programación. Convierte una intención inicial en una cadena
versionable de constitución, especificación, plan técnico, artefactos de diseño,
tareas e implementación. Fue creado en GitHub el 21 de agosto de 2025 y
presentado públicamente por Den Delimarsky el 2 de septiembre de 2025 [SK1,
SK2]. Al corte, la versión estable era
[`v0.13.2`](https://github.com/github/spec-kit/releases/tag/v0.13.2), publicada
el mismo 21 de julio de 2026 [SK3].

Su aporte principal no es un modelo nuevo ni autonomía adicional. Es un
**protocolo de contexto persistente** entre personas, repositorio y agente:

```text
constitution
  -> specify -> clarify
  -> plan -> checklist
  -> tasks -> analyze
  -> implement <-> converge
```

La separación entre **qué/por qué** y **cómo**, los artefactos revisables y el
análisis de consistencia pueden reducir ambigüedad antes de escribir código.
Eso es una **ventaja estructural plausible**, no una mejora cuantificada. El
agente sigue siendo probabilístico; los tests son opcionales salvo que la
constitución, la especificación o el usuario los exijan; y Spec Kit no sustituye
CI, revisión humana, controles de seguridad ni observabilidad [SK8].

Frente a alternativas:

- **OpenSpec** gestiona mejor cambios incrementales mediante specs vigentes y
  deltas con menor ceremonia;
- **GSD Core** gobierna un ciclo agentivo más amplio, con memoria de proyecto,
  subagentes, verificación y entrega;
- **Superpowers** disciplina con más fuerza la conducta del agente mediante
  brainstorming, worktrees, TDD, revisión y verificación.

La recomendación prudente es **pilotear Spec Kit**, no adoptarlo por popularidad.
Debe compararse con el flujo actual y con un flujo estructurado equivalente sin
Spec Kit, manteniendo constantes modelo, harness, repositorios y tipos de tarea.

---

## Índice

1. [Cómo leer la evidencia](#1-cómo-leer-la-evidencia)
2. [Identidad, origen y alcance](#2-identidad-origen-y-alcance)
3. [Instalación, compatibilidad y comandos](#3-instalación-compatibilidad-y-comandos)
4. [Cómo se trabaja y qué artefactos produce](#4-cómo-se-trabaja-y-qué-artefactos-produce)
5. [Persistencia y evolución de las specs](#5-persistencia-y-evolución-de-las-specs)
6. [Seguridad, gobierno y límites operativos](#6-seguridad-gobierno-y-límites-operativos)
7. [Métricas, adopción y evidencia](#7-métricas-adopción-y-evidencia)
8. [Marco práctico para un piloto controlado](#8-marco-práctico-para-un-piloto-controlado)
9. [Comparación con OpenSpec, GSD Core y Superpowers](#9-comparación-con-openspec-gsd-core-y-superpowers)
10. [Cuándo elegir y cómo combinar](#10-cuándo-elegir-y-cómo-combinar)
11. [Recomendación y conclusión](#11-recomendación-y-conclusión)
12. [Limitaciones y revalidación](#12-limitaciones-y-revalidación)
13. [Referencias](#13-referencias)

---

## 1. Cómo leer la evidencia

Este documento separa cuatro tipos de afirmación:

| Marca | Significado | Uso correcto |
|---|---|---|
| **HECHO** | Dato verificable en repositorio, release, manifiesto, plantilla o documentación oficial | Describe qué existe y cómo está diseñado |
| **TESIS DEL PROVEEDOR** | Explicación o promesa de GitHub sobre por qué SDD funciona | Informa la intención de diseño; no prueba resultados |
| **EVIDENCIA INDIRECTA** | Estudio sobre requisitos, Copilot, agentes, seguridad o DevEx que no evalúa Spec Kit | Sustenta riesgos o mecanismos generales, no el efecto de Spec Kit |
| **INFERENCIA/RECOMENDACIÓN** | Juicio derivado de arquitectura, evidencia y contexto | Debe validarse mediante piloto local |

Reglas usadas:

1. Popularidad, descargas y número de integraciones son **adopción**, no
   productividad.
2. Un resultado sobre GitHub Copilot no puede atribuirse a Spec Kit.
3. Una plantilla que pide criterios medibles demuestra instrumentación, no que
   el agente los cumpla.
4. Una afirmación del creador de un framework es fuente de autoridad sobre su
   diseño, pero no evidencia independiente de eficacia.
5. ISO/IEC/IEEE 29148 fundamenta la ingeniería de requisitos; no certifica ni
   valida Spec Kit [AU2].

## 2. Identidad, origen y alcance

### 2.1 Qué es

**HECHO.** Spec Kit es:

- un CLI Python llamado `specify`;
- plantillas e instrucciones para agentes;
- una convención de artefactos Markdown versionables;
- un flujo SDD extensible mediante overrides, presets, extensiones y bundles;
- una integración con múltiples coding agents [SK1, SK4, SK5].

**HECHO.** No es:

- un LLM;
- un coding agent independiente;
- un motor de CI;
- un sandbox;
- un gestor de proyectos completo;
- una garantía de trazabilidad real o código correcto.

### 2.2 Origen y estado

| Dato | Estado al corte |
|---|---|
| Repositorio canónico | `github/spec-kit` |
| Creación del repositorio | 21-08-2025 |
| Anuncio público | 02-09-2025, Den Delimarsky en GitHub Blog |
| Licencia | MIT |
| Implementación principal | Python |
| Versión estable | `v0.13.2` |
| Publicación de la versión | 21-07-2026 |
| Runtime documentado | Python 3.11+ |
| Git | Opcional; requerido solo si se habilita la extensión Git |

Fuentes: repositorio, instalación, licencia y release [SK1, SK3, SK4].

### 2.3 La propuesta metodológica

**TESIS DEL PROVEEDOR.** GitHub plantea una inversión de poder: la
especificación deja de ser documentación auxiliar y pasa a dirigir planes y
código; el código sería una expresión regenerable de la intención [SK2, SK7].

La formulación fuerte —que SDD “elimina” la brecha entre especificación e
implementación— debe leerse como visión metodológica. En la práctica persisten:

- interpretación probabilística;
- conocimiento incompleto del dominio;
- requisitos contradictorios;
- errores de implementación;
- deriva entre documentos y código;
- restricciones no visibles para el agente.

**INFERENCIA.** El valor más defendible de Spec Kit no es “hacer ejecutable toda
especificación”, sino **hacer explícitas, revisables y persistentes más decisiones
antes y durante la implementación**.

### 2.4 Alcance greenfield y brownfield

La documentación contempla:

- **0-to-1/greenfield:** definir producto y arquitectura desde cero;
- **exploración creativa:** producir alternativas desde una intención común;
- **mejora iterativa/brownfield:** añadir features o modernizar sistemas
  existentes [SK1].

**INFERENCIA.** Greenfield aprovecha mejor la constitución y la generación de
artefactos amplios. Brownfield exige más disciplina para no duplicar ADR, PRD,
contratos, documentación y comportamiento ya codificado. Birgitta Böckeler
advierte precisamente sobre ceremonia, exceso de Markdown y falsa sensación de
control en herramientas SDD [AU1].

## 3. Instalación, compatibilidad y comandos

### 3.1 Instalación reproducible

La ruta oficial recomendada usa `uv` y una etiqueta fija [SK3, SK4]:

```bash
uv tool install specify-cli \
  --from git+https://github.com/github/spec-kit.git@v0.13.2

specify version
specify init mi-proyecto --integration copilot
cd mi-proyecto
```

También existe el paquete oficial de PyPI:

```bash
uv tool install specify-cli==0.13.2
# alternativas documentadas:
# pipx install specify-cli==0.13.2
# pip install specify-cli==0.13.2
```

Para inicializar el repositorio actual:

```bash
specify init --here --integration copilot
```

Antes de usar `--force`, debe respaldarse o revisarse el material personalizado
fuera de `specs/`, especialmente `.specify/memory/constitution.md` y cambios en
`.specify/templates/` o `.specify/scripts/` [SK6].

**RECOMENDACIÓN.** En empresa:

- fijar versión y hash/artefacto;
- instalar desde un registro o mirror aprobado;
- revisar el diff de archivos generados;
- probar la actualización en una rama;
- no usar `latest` en un piloto reproducible.

### 3.2 Compatibilidad

**HECHO.** La documentación de `v0.13.2` declara **más de 30 integraciones** y
recomienda ejecutar `specify integration list` como fuente autoritativa de la
versión instalada [SK1, SK5].

Entre las integraciones documentadas están GitHub Copilot, Claude Code, Gemini
CLI, Codex CLI, Cursor, Cline, Devin, Goose, Junie, Kiro CLI, OpenCode, Amp,
Auggie, Antigravity, Forge, Kimi Code y otras [SK5]. La lista es volátil.

La experiencia no es equivalente entre harnesses:

| Patrón | Ejemplo |
|---|---|
| Comandos tradicionales | `/speckit.specify`, `/speckit.plan` |
| Skills de Codex CLI | `$speckit-specify`, `$speckit-plan` |
| Skills con prefijo slash en algunos harnesses | `/speckit-specify` |
| GitHub Copilot CLI | seleccionar el agente mediante `/agents` o dirigirlo explícitamente; no asumir paridad exacta con comandos del IDE |

Para GitHub Copilot, la integración predeterminada de `v0.13.2` generaba
`.agent.md` bajo `.github/agents/`, prompts acompañantes bajo
`.github/prompts/` y ajustes de VS Code. El modo skills se solicita con:

```bash
specify init mi-proyecto \
  --integration copilot \
  --integration-options="--skills"
```

Ese modo instala skills bajo `.github/skills/` [SK5]. La propia documentación
marca el layout legado como deprecado, por lo que esta integración debe
revalidarse al actualizar.

### 3.3 Comandos principales

| Comando conceptual | Función | Tipo |
|---|---|---|
| `constitution` | Crear o actualizar principios y restricciones duraderas | Gobierno |
| `specify` | Definir qué construir, para quién y con qué resultado | Requisitos |
| `clarify` | Resolver ambigüedades antes del plan | Calidad de requisitos |
| `plan` | Traducir intención a arquitectura y estrategia técnica | Diseño |
| `checklist` | Crear listas de calidad para revisar requisitos | Control |
| `tasks` | Descomponer el plan en trabajo ordenado y trazable | Planificación |
| `analyze` | Analizar consistencia y cobertura sin modificar artefactos | Verificación previa |
| `implement` | Ejecutar las tareas | Construcción |
| `converge` | Contrastar código con intención y anexar trabajo faltante | Cierre iterativo |
| `taskstoissues` | Convertir tareas en issues de GitHub | Seguimiento |

`analyze` es de solo lectura y busca duplicaciones, ambigüedades, cobertura y
conflictos entre `spec.md`, `plan.md`, `tasks.md` y constitución [SK9].
`converge` no implementa: evalúa el estado actual y, si encuentra brechas,
**anexa** una fase nueva a `tasks.md`; si no hay brechas, debe dejarlo sin
cambios [SK10].

## 4. Cómo se trabaja y qué artefactos produce

### 4.1 Flujo mínimo

```text
specify -> plan -> tasks -> implement -> converge
                                      ^          |
                                      |__________|
```

### 4.2 Flujo ampliado recomendado para cambios relevantes

```text
constitution
  -> specify
  -> clarify
  -> plan
  -> checklist
  -> tasks
  -> analyze
  -> revisión humana
  -> implement
  -> tests / CI / revisión
  -> converge
  -> repetir implement + converge si quedan brechas
```

### 4.3 Responsabilidad por etapa

1. **Constitución.** El equipo fija calidad, pruebas, seguridad, experiencia de
   usuario, arquitectura y límites organizacionales.
2. **Specify.** Se describe necesidad y éxito sin elegir prematuramente stack o
   estructura.
3. **Clarify.** Se resuelven supuestos de alto impacto.
4. **Plan.** Se seleccionan tecnologías, arquitectura, datos, contratos y
   estrategia de validación.
5. **Checklist/analyze.** Se revisa calidad interna y trazabilidad antes del
   código.
6. **Tasks.** Se producen unidades ejecutables, dependencias y oportunidades de
   paralelismo.
7. **Implement.** El agente modifica el repositorio según las tareas.
8. **Converge.** Se compara implementación actual contra intención y se agrega
   trabajo pendiente.

**HECHO CRÍTICO.** La plantilla oficial de tareas dice que las pruebas son
**opcionales** y solo deben incluirse si fueron solicitadas explícitamente
[SK8]. Por tanto, no debe describirse Spec Kit como TDD por defecto.

**RECOMENDACIÓN.** Toda constitución empresarial debería exigir:

- pruebas apropiadas al riesgo;
- criterios negativos y de abuso;
- validación de contratos;
- revisión humana;
- CI obligatorio;
- trazabilidad requisito -> tarea -> prueba/evidencia.

### 4.4 Artefactos

Una feature suele vivir bajo:

```text
.specify/
├── memory/
│   └── constitution.md
├── scripts/
└── templates/

specs/
└── 001-nombre-feature/
    ├── spec.md
    ├── plan.md
    ├── research.md
    ├── data-model.md
    ├── quickstart.md
    ├── contracts/
    └── tasks.md
```

| Artefacto | Pregunta principal | Riesgo si se usa mal |
|---|---|---|
| `constitution.md` | ¿Qué principios no debe violar el proyecto? | Reglas genéricas, contradictorias o imposibles de verificar |
| `spec.md` | ¿Qué comportamiento y resultado se requiere? | Solución técnica disfrazada de requisito |
| `plan.md` | ¿Cómo se construirá y por qué? | Plan extenso que envejece antes del código |
| `research.md` | ¿Qué incertidumbres técnicas se investigaron? | Fuentes no verificadas o decisiones sin fecha |
| `data-model.md` | ¿Qué entidades y relaciones existen? | Duplicación con esquema real |
| `contracts/` | ¿Qué interfaces deben respetarse? | Contratos desincronizados |
| `quickstart.md` | ¿Cómo se valida el escenario principal? | Happy path sin negativos |
| `tasks.md` | ¿Qué trabajo queda, en qué orden y con qué trazabilidad? | Checklist que sustituye criterio ingenieril |

**INFERENCIA.** Los documentos son un mecanismo de memoria externa y
coordinación. No son evidencia de que la intención se haya entendido ni de que
el resultado sea correcto.

### 4.5 Extensibilidad

`v0.13.2` distingue:

- **overrides locales:** cambios específicos del proyecto;
- **presets:** modifican formatos, términos o estándares;
- **extensions:** agregan comandos, hooks o capacidades;
- **bundles:** empaquetan componentes para un rol o equipo [SK1].

Esto permite adaptar Spec Kit a seguridad, compliance, Jira o trazabilidad tipo
V-Model. También aumenta la superficie de supply chain, ejecución y conflicto
entre instrucciones.

## 5. Persistencia y evolución de las specs

Spec Kit no impone una única política. Documenta tres modelos [SK6]:

| Modelo | Regla de cambio | Mejor ajuste | Riesgo principal |
|---|---|---|---|
| **Flow-back** | Puede cambiar spec, plan, tareas o código; luego se reconcilian | Iteración rápida y equipos cercanos | Divergencia silenciosa |
| **Flow-forward** | Cada cambio crea un nuevo directorio; los anteriores son historia | Auditoría y trazabilidad temporal | Duplicación y fragmentación |
| **Living spec** | Se cambia primero `spec.md`; plan y tareas se regeneran o revisan | Spec como contrato mantenido | Pérdida de racionales técnicos |

Esto es distinto de la taxonomía de ciclo de vida:

- **spec-first:** la spec precede al código y puede desecharse;
- **spec-anchored:** permanece como referencia;
- **spec-as-source:** es la fuente humana principal y el código se deriva.

**RECOMENDACIÓN.** El equipo debe declarar en la constitución:

1. cuál artefacto es normativo;
2. quién aprueba cambios;
3. cuándo una spec se archiva o actualiza;
4. cómo se resuelven conflictos con código, tests, ADR y contratos;
5. cómo se conserva el racional que no cabe en `spec.md`.

Para brownfield, empezar con una feature acotada. No intentar reconstruir todo el
sistema en Markdown antes de entregar valor.

## 6. Seguridad, gobierno y límites operativos

### 6.1 Modelo de riesgo

Spec Kit prepara instrucciones que un agente ejecuta con las capacidades del
harness. **No crea un sandbox ni una frontera de capacidades.** Un workflow
puede leer código, ejecutar shell, instalar dependencias, modificar archivos o
usar credenciales disponibles para el proceso.

Riesgos principales:

- *prompt injection* en issues, documentación, código, dependencias o páginas
  consultadas por el agente;
- *excessive agency*: permisos o autonomía mayores que los necesarios;
- comandos destructivos o acceso remoto;
- filtración de secretos por contexto, logs o herramientas;
- dependencia comprometida, extensión o catálogo malicioso;
- instrucciones incompatibles entre constitución, presets, extensiones,
  repositorio y harness;
- aprobación automática de una spec incorrecta;
- falso cierre porque `tasks.md` aparece completo.

OWASP recomienda separación de contenido e instrucciones, privilegio mínimo,
validación de salidas, límites de herramientas y aprobación humana para acciones
de alto impacto [AU3, AU4].

### 6.2 Controles mínimos

1. Fijar versiones y revisar procedencia.
2. Revisar en PR todo archivo generado o actualizado por `specify init`.
3. Ejecutar inicialmente sin permisos globales ni `allow-all`.
4. Separar lectura, escritura local y acciones remotas.
5. Exigir aprobación humana para dependencias, secretos, deploy, Git remoto,
   infraestructura y datos.
6. Usar branch protection, CODEOWNERS, CI y escaneo de secretos/dependencias.
7. Tratar texto externo como datos no confiables.
8. Registrar comandos, herramientas, fallos y aprobaciones sin almacenar
   secretos.
9. Probar smoke tests de integración después de actualizar el harness.
10. No permitir que `converge` sustituya pruebas o revisión independiente.

La release `v0.13.2` incluyó correcciones para revalidar URLs de catálogos tras
redirecciones HTTPS y rechazar pasos de workflow mal formados. Esto demuestra
mantenimiento de seguridad, pero también que presets, extensiones y workflows
son superficie de ataque [SK3].

## 7. Métricas, adopción y evidencia

> **Advertencia visible:** las cifras de esta sección son una captura volátil
> del 21 de julio de 2026. No representan usuarios activos, calidad ni ROI.

### 7.1 Señales directas de adopción

| Señal | Captura al corte | Interpretación válida |
|---|---:|---|
| GitHub stars | 123.111 | Interés público observable |
| Forks | 10.977 | Copias públicas; no instalaciones |
| Suscriptores | 628 | Seguimiento del repositorio |
| PyPI, último día | 1.702 descargas | Tráfico del paquete |
| PyPI, última semana | 9.559 descargas | Incluye CI y reinstalaciones |
| PyPI, último mes | 20.832 descargas | No equivale a usuarios únicos |
| Integraciones | 30+ declaradas | Amplitud de compatibilidad nominal |

Fuentes: API de GitHub, PyPI Stats y documentación oficial [SK1, SK5, SK11,
SK12]. Estas cifras pueden cambiar en minutos.

### 7.2 Evidencia causal directa

**No encontrada.** No hay evidencia pública que compare, manteniendo constantes
modelo, agente y tarea:

- Spec Kit frente a un flujo sin Spec Kit;
- defectos, retrabajo o mantenibilidad;
- tiempo humano y tiempo calendario;
- costo total de tokens y revisión;
- seguridad o vulnerabilidades;
- cumplimiento real de requisitos.

### 7.3 Evidencia indirecta relevante

| Fuente | Resultado | Qué permite concluir | Qué no permite concluir |
|---|---|---|---|
| Peng et al., RCT, `n=95` [AC2] | 55,8 % menos tiempo en una tarea JavaScript con Copilot | Un asistente puede acelerar una tarea concreta | Que Spec Kit cause esa mejora |
| GitHub, estudio de calidad [EN1] | Mejoras en tests, aprobación y mantenibilidad evaluada en una tarea Python | La asistencia puede afectar calidad bajo ciertas condiciones | Efecto de SDD o de Spec Kit |
| Microsoft Research, tres experimentos, `n=4.867` [EN2] | +26,08 % tareas completadas, con alta incertidumbre | Señal empresarial sobre actividad | Valor longitudinal o causalidad de Spec Kit |
| Accenture/GitHub [EN3] | Cambios en PR, merge y builds en un despliegue empresarial | Caso de adopción a escala | Generalización independiente |
| METR 2025 [EN5] | Desarrolladores experimentados tardaron 19 % más con herramientas de inicios de 2025 | La IA puede introducir ralentización y percepción errónea | Efecto actual o de Spec Kit |
| METR 2026 [EN6] | Datos posteriores insuficientes por selección y concurrencia | Medir productividad agentiva es difícil | Una estimación actual fiable |
| DORA 2025 [EN4] | La IA actúa como amplificador de fortalezas y debilidades organizacionales | El sistema de trabajo importa tanto como la herramienta | ROI causal de un framework |
| Vaithilingam et al., CHI [AC3] | Sin mejora significativa de tiempo/éxito; sí preferencia de usuarios | Usabilidad y comprensión pueden divergir de velocidad | Rendimiento de agentes modernos |
| Pearce et al. [AC4] y Perry et al. [AC5] | Riesgos de código vulnerable y confianza injustificada | Seguridad debe medirse y revisarse | Que Spec Kit reduzca esos riesgos |
| Montgomery et al. [AC1] | Ambigüedad, completitud, consistencia y corrección son atributos centrales | Fundamenta revisar requisitos | Eficacia de las plantillas de Spec Kit |
| SWE-bench [AC8] | Benchmark de issues reales con tests | Sirve para evaluar resolución automatizada | Productividad humana, DevEx o mantenibilidad |

### 7.4 Lectura prudente

- La evidencia sobre asistentes es heterogénea y dependiente de tarea, modelo,
  experiencia y repositorio.
- La estructura de Spec Kit puede mejorar claridad y trazabilidad, pero también
  aumentar ceremonia, tokens, latencia y carga de revisión.
- El efecto neto solo puede estimarse en el contexto de la organización.

## 8. Marco práctico para un piloto controlado

### 8.1 Pregunta

> ¿Cuál es el efecto incremental de Spec Kit, frente al flujo actual y frente a
> una estructura documental equivalente, sobre cambios aceptados de software?

### 8.2 Diseño

Usar tres condiciones:

1. **Control A — flujo habitual:** agente y prácticas actuales.
2. **Control B — flujo estructurado sin Spec Kit:** requisitos, plan, tareas,
   revisión y tests equivalentes, pero sin sus plantillas/comandos.
3. **Tratamiento — Spec Kit:** versión fija, constitución y flujo acordado.

Mantener constantes:

- modelo y versión;
- harness y permisos;
- repositorio/branch base;
- herramientas disponibles;
- límites de contexto y presupuesto;
- política de revisión;
- definición de terminado.

Asignar tareas de forma aleatoria o pareada y estratificar por:

- greenfield/brownfield;
- tamaño;
- incertidumbre;
- criticidad;
- número de archivos;
- experiencia del desarrollador en el repositorio.

La unidad primaria debe ser **el cambio aceptado**, no líneas, commits ni
actividad individual.

### 8.3 Indicadores

| Eje | Indicadores recomendados |
|---|---|
| **Proceso** | tiempo por fase, aclaraciones, iteraciones, replanificaciones, cobertura requisito -> tarea -> prueba, abandono, intervención humana |
| **Resultado** | criterios de aceptación cumplidos, cambios aceptados, valor de usuario, throughput y métricas DORA contextualizadas |
| **Calidad** | tests pasados, mutation score cuando aplique, defectos escapados, regresiones, retrabajo, rollback |
| **Seguridad** | vulnerabilidades ponderadas, secretos expuestos, dependencias riesgosas, comandos no autorizados, tiempo de remediación |
| **Costo** | tokens de entrada/salida/caché, llamadas, reintentos, costo de modelo, infraestructura y horas humanas por cambio aceptado |
| **Tiempo** | lead time, cycle time, tiempo humano activo, tiempo de agente, espera y revisión |
| **Mantenibilidad** | complejidad, duplicación, churn a 30/90 días, deuda, legibilidad, deriva spec-código |
| **DevEx** | satisfacción, carga cognitiva, estado de flujo, facilidad para retomar, calidad del feedback, confianza calibrada |

SPACE y el marco DevEx ayudan a evitar reducir productividad a una sola métrica
[AC6, AC7]. DORA debe usarse a nivel de sistema/equipo, no para evaluar personas
[EN4].

### 8.4 Instrumentación mínima

Por cada cambio:

```text
id de tarea
condición experimental
modelo/harness/versión
inicio y fin por fase
tiempo humano activo
tiempo de agente
tokens/costo
artefactos y revisiones
tests/CI
hallazgos humanos y de seguridad
resultado de aceptación
incidentes y retrabajo a 30/90 días
```

### 8.5 Análisis

- preregistrar hipótesis y criterios de éxito;
- reportar mediana, P25/P75 y P90, no solo promedio;
- incluir intervalos de confianza;
- separar tareas fallidas y abandonadas;
- analizar por tamaño y riesgo;
- registrar compliance del flujo y desviaciones;
- no excluir outliers sin regla previa;
- publicar también resultados negativos.

### 8.6 Criterios de decisión sugeridos

Son criterios internos, no promesas del producto:

- cero acciones destructivas o remotas no autorizadas;
- sin aumento de defectos escapados ni vulnerabilidades;
- cobertura de requisitos y pruebas no inferior al control;
- reducción material de retrabajo o tiempo humano activo;
- costo total dentro del presupuesto;
- deriva documental por debajo del umbral acordado;
- DevEx no inferior al baseline;
- beneficio concentrado en tipos de tarea identificables.

## 9. Comparación con OpenSpec, GSD Core y Superpowers

Versiones verificadas al corte:

- Spec Kit [`v0.13.2`](https://github.com/github/spec-kit/releases/tag/v0.13.2);
- OpenSpec [`v1.6.0`](https://github.com/Fission-AI/OpenSpec/releases/tag/v1.6.0);
- GSD Core [`v1.8.0`](https://github.com/open-gsd/gsd-core/releases/tag/v1.8.0);
- Superpowers [`v6.1.1`](https://github.com/obra/superpowers/releases/tag/v6.1.1).

GSD Core `v1.8.0` fue publicado el 22-07-2026 a las 00:05 UTC, equivalente al
21-07-2026 en UTC-5. Por eso sustituye al `v1.7.0` citado en documentos locales
con corte del 20 de julio. Su manifiesto exige Node.js >=22 y npm >=10 [C2].

| Dimensión | GitHub Spec Kit | OpenSpec | GSD Core | Superpowers |
|---|---|---|---|---|
| **Centro de gravedad** | Requisitos, constitución y trazabilidad spec -> plan -> tareas -> código | Acuerdo ligero sobre comportamiento vigente y deltas de cambio | Ingeniería de contexto y ciclo agentivo completo | Disciplina operacional del agente durante diseño, construcción y revisión |
| **Modelo mental** | Cada feature produce un conjunto rico de artefactos | Specs actuales + changes/deltas que se sincronizan y archivan | Proyecto -> milestone -> fase -> planes -> ejecución/verificación/ship | Brainstorm -> diseño -> plan granular -> worktree/subagentes -> TDD/review |
| **Flujo** | Constitution, specify, clarify, plan, checklist, tasks, analyze, implement, converge | Explore, propose, apply, sync/archive; acciones fluidas | Discuss, plan, execute, verify, ship; spec opcional por fase | Brainstorming, worktree, writing plans, ejecución, TDD, review, finish branch |
| **Persistencia** | `.specify/` + `specs/<feature>/` | `openspec/specs/` + `openspec/changes/` + archive | `.planning/` con estado, requisitos, roadmap, contexto y evidencia | Diseños/planes persistentes; estado SDD más transitorio |
| **Comportamiento vigente** | Depende del modelo de persistencia elegido | Fortaleza central: specs vigentes por dominio | Se expresa en requisitos/estado del proyecto | No mantiene necesariamente una spec vigente completa |
| **Cambios brownfield** | Posibles, con riesgo de duplicar documentos | Ajuste especialmente fuerte por deltas incrementales | Adecuado para iniciativas amplias y multifase | Adecuado cuando importa rigor de ejecución más que catálogo de comportamiento |
| **Gobierno organizacional** | Constitución, presets, extensiones y bundles | Configuración y convenciones de changes/specs | Estado, roles, agentes, hooks y workflow amplio | Skills y hard gates conductuales |
| **Planificación** | Plan técnico y artefactos auxiliares detallados | `design.md` y `tasks.md` flexibles | Planes atómicos, dependencias, research, waves y plan-checker | Plan muy granular con pasos pequeños |
| **Subagentes** | Dependen del harness; no son el núcleo de Spec Kit | No los orquesta | Parte central del enfoque | Parte central del modo subagent-driven, si el harness lo soporta |
| **TDD** | No obligatorio por defecto | No obligatorio | Configurable mediante gates/pruebas | Identitario y prescriptivo: RED-GREEN-REFACTOR |
| **Verificación** | Checklist, analyze, CI externo y converge | Validación estructural; verify agentivo según perfil | Verifier, tests, UAT y evidencia por fase | Review por tarea, review final y verificación antes de afirmar éxito |
| **Git/PR** | Git dejó de ser requisito general; puede agregarse por extensión | No gestiona Git | Integra commits, ramas/worktrees y preparación de PR | Worktree y cierre de rama son parte del flujo |
| **Extensibilidad** | Overrides, presets, extensiones y bundles | Skills/comandos y perfiles | Agentes, skills, hooks e integración por runtime | Skills componibles y adaptadores por harness |
| **Ceremonia** | Media/alta, adaptable | Baja/media | Alta | Media/alta; especialmente alta para cambios pequeños |
| **Riesgo típico** | Exceso de Markdown y deriva entre artefactos | Spec vigente desactualizada o delta insuficiente | Costo/contexto, permisos y orquestación compleja | Sobrecosto, dependencia del bootstrap y compliance probabilístico |
| **Mejor ajuste** | Gobernanza de requisitos, arquitectura y trazabilidad auditable | Brownfield incremental con baja disrupción | Features grandes, largas, coordinadas y multisesión | Equipos que priorizan TDD, aislamiento, reviews y disciplina de ejecución |
| **Evidencia causal propia** | No encontrada | No encontrada | No encontrada | No encontrada; evals internas no equivalen a evidencia independiente |

Fuentes de producto y autores: [C1, C2, C3, C4]. Para análisis extensos del
repositorio local, véanse [OpenSpec](OpenSpec.md), [Open GSD](OpenGSD.md),
[Open GSD vs. OpenSpec](OpenGSD-vs-OpenSpec.md) y
[Superpowers](Superpowers.md).

## 10. Cuándo elegir y cómo combinar

### 10.1 Elegir Spec Kit

Cuando:

- la organización necesita constitución y estándares reutilizables;
- requisitos, arquitectura y tareas deben ser revisables y trazables;
- se valoran plantillas extensibles por rol o dominio;
- la feature justifica una fase formal de aclaración y planificación;
- se acepta gobernar explícitamente la persistencia de specs.

No es la primera opción para un hotfix trivial o un cambio mecánico reversible.

### 10.2 Elegir OpenSpec

Cuando:

- predomina brownfield;
- se quiere documentar solo el delta;
- es importante mantener specs vigentes por dominio;
- el equipo controla Git, CI y ejecución por otros medios;
- se busca menor ceremonia.

### 10.3 Elegir GSD Core

Cuando:

- el trabajo dura múltiples sesiones o fases;
- la pérdida de contexto es un problema dominante;
- se necesita subagentes, estado de proyecto, verificación y ship;
- se acepta mayor costo, permisos y complejidad operativa.

### 10.4 Elegir Superpowers

Cuando:

- el problema principal es que el agente salta diseño, tests o review;
- TDD estricto y worktrees son políticas deseadas;
- se quiere implementador/reviewer por tarea;
- el harness soporta adecuadamente skills, aislamiento y subagentes.

Jesse Vincent documenta el origen y la intención de este proceso; es autoridad
sobre Superpowers, no evidencia comparativa independiente [C4].

### 10.5 Combinaciones

#### Spec Kit + Superpowers

Combinación más natural:

```text
Spec Kit: constitución + spec + plan + tareas aprobadas
Superpowers: worktree + TDD + ejecución + review + verificación
```

Definir una sola lista de tareas y evitar que ambos frameworks generen planes
competidores. El costo de ceremonia debe medirse.

#### Spec Kit + GSD Core

Solo para piloto avanzado. Posible reparto:

- Spec Kit: intención funcional y principios;
- GSD Core: estado, contexto de fase, ejecución, verificación y ship.

Los planes/tareas de GSD deben **referenciar**, no copiar, requisitos de Spec
Kit. Si ambos mantienen planes completos, habrá dos fuentes de verdad.

#### Spec Kit + OpenSpec

En general conviene **elegir uno como sistema de especificación**. Podría usarse
OpenSpec como catálogo de comportamiento vigente y Spec Kit para una iniciativa
greenfield separada, pero usar ambos sobre el mismo change duplica specs,
revisión y sincronización.

#### OpenSpec o Spec Kit + Superpowers

Patrón razonable: la primera herramienta conserva intención; Superpowers impone
disciplina de construcción. CI, seguridad y aprobación humana siguen externos.

## 11. Recomendación y conclusión

### Recomendación

1. Pilotear `v0.13.2` en cambios medianos, no en todo el portafolio.
2. Seleccionar un modelo de persistencia y escribirlo en la constitución.
3. Hacer obligatorios tests, CI, revisión humana y controles de seguridad.
4. Comparar contra dos controles para aislar el valor de las plantillas y
   comandos, no solo el valor de “planificar”.
5. Medir costo total, tiempo humano, retrabajo, defectos, seguridad,
   mantenibilidad y DevEx.
6. Revalidar integración y archivos generados al actualizar.

### Conclusión prudente

Spec Kit es una implementación madura y extensible de una idea razonable:
trasladar parte de la intención y del razonamiento desde chats efímeros hacia
artefactos versionados que humanos y agentes puedan revisar. Su constitución,
separación de requisitos y diseño, análisis de consistencia y convergencia son
diferenciadores reales de arquitectura.

No se ha demostrado que ese diseño produzca, por sí mismo, software mejor, más
rápido, más barato o más seguro. Puede reducir ambigüedad y retrabajo; también
puede aumentar documentos, tokens, latencia y falsa confianza. La decisión
correcta depende del tamaño del cambio, madurez del equipo, capacidades del
harness y resultados de un piloto controlado.

## 12. Limitaciones y revalidación

- El ecosistema cambió incluso durante la fecha de corte: GSD Core publicó
  `v1.8.0` minutos antes del cierre en UTC-5.
- Stars, forks, descargas e integraciones son volátiles.
- La compatibilidad nominal no garantiza paridad de hooks, skills, subagentes o
  permisos.
- Varias fuentes empresariales tienen interés comercial.
- Preprints y benchmarks automatizados no miden por sí solos trabajo humano.
- No se ejecutó un experimento propio de Spec Kit para este documento.

Antes de adoptar:

```bash
specify version
specify self check
specify integration list
```

Además, revalidar releases, manifiestos, requisitos de runtime, archivos
generados, política de telemetría, catálogos y permisos.

## 13. Referencias

### GitHub Spec Kit — fuentes primarias

- **[SK1]** GitHub. [`github/spec-kit`, README `v0.13.2`](https://github.com/github/spec-kit/blob/v0.13.2/README.md).
- **[SK2]** Delimarsky, Den. GitHub Blog, 02-09-2025.
  [Spec-driven development with AI: Get started with a new open source toolkit](https://github.blog/ai-and-ml/generative-ai/spec-driven-development-with-ai-get-started-with-a-new-open-source-toolkit/).
- **[SK3]** GitHub.
  [Spec Kit `v0.13.2`](https://github.com/github/spec-kit/releases/tag/v0.13.2).
- **[SK4]** GitHub.
  [Installation Guide `v0.13.2`](https://github.com/github/spec-kit/blob/v0.13.2/docs/installation.md).
- **[SK5]** GitHub.
  [Supported AI Coding Agent Integrations](https://github.github.io/spec-kit/reference/integrations.html).
- **[SK6]** GitHub.
  [Spec Persistence Models](https://github.com/github/spec-kit/blob/v0.13.2/docs/concepts/spec-persistence.md) y
  [Evolving Specs](https://github.com/github/spec-kit/blob/v0.13.2/docs/guides/evolving-specs.md).
- **[SK7]** GitHub.
  [Specification-Driven Development](https://github.com/github/spec-kit/blob/v0.13.2/spec-driven.md).
- **[SK8]** GitHub.
  [Tasks template `v0.13.2`](https://github.com/github/spec-kit/blob/v0.13.2/templates/tasks-template.md).
- **[SK9]** GitHub.
  [Comando `analyze`](https://github.com/github/spec-kit/blob/v0.13.2/templates/commands/analyze.md).
- **[SK10]** GitHub.
  [Comando `converge`](https://github.com/github/spec-kit/blob/v0.13.2/templates/commands/converge.md).
- **[SK11]** GitHub API.
  [`github/spec-kit`](https://api.github.com/repos/github/spec-kit).
- **[SK12]** PyPI Stats.
  [`specify-cli`](https://pypistats.org/packages/specify-cli).

### Autoridades y estándares

- **[AU1]** Böckeler, Birgitta. Martin Fowler / Thoughtworks.
  [Understanding Spec-Driven-Development: Kiro, spec-kit, and Tessl](https://martinfowler.com/articles/exploring-gen-ai/sdd-3-tools.html).
- **[AU2]** ISO/IEC/IEEE.
  [ISO/IEC/IEEE 29148:2018 — Requirements engineering](https://www.iso.org/standard/72089.html).
- **[AU3]** OWASP.
  [LLM01: Prompt Injection](https://genai.owasp.org/llmrisk/llm01-prompt-injection/).
- **[AU4]** OWASP.
  [LLM06: Excessive Agency](https://genai.owasp.org/llmrisk/llm062025-excessive-agency/).

### Evidencia académica y revisada por pares

- **[AC1]** Montgomery et al.
  [Requirements quality attributes: systematic review](https://pmc.ncbi.nlm.nih.gov/articles/PMC9110500/).
- **[AC2]** Peng et al.
  [The Impact of AI on Developer Productivity](https://arxiv.org/abs/2302.06590).
- **[AC3]** Vaithilingam, Siva; Zhang, Tianyi; Glassman, Elena.
  CHI 2022.
  [Expectation vs. Experience: Evaluating the Usability of Code Generation Tools Powered by Large Language Models](https://doi.org/10.1145/3491101.3519665).
- **[AC4]** Pearce et al.
  [Asleep at the Keyboard? Assessing the Security of GitHub Copilot's Code Contributions](https://arxiv.org/abs/2108.09293).
- **[AC5]** Perry et al.
  [Do Users Write More Insecure Code with AI Assistants?](https://arxiv.org/abs/2211.03622).
- **[AC6]** Forsgren et al.
  [The SPACE of Developer Productivity](https://queue.acm.org/detail.cfm?id=3454124).
- **[AC7]** Noda et al.
  [DevEx: What Actually Drives Productivity](https://queue.acm.org/detail.cfm?id=3595878).
- **[AC8]** Jimenez et al.
  [SWE-bench: Can Language Models Resolve Real-World GitHub Issues?](https://arxiv.org/abs/2310.06770).

### Evidencia empresarial e independiente

- **[EN1]** GitHub Research.
  [Does GitHub Copilot improve code quality?](https://github.blog/news-insights/research/does-github-copilot-improve-code-quality-heres-what-the-data-says/).
- **[EN2]** Microsoft Research.
  [The Effects of Generative AI on High-Skilled Work: Evidence from Three Field Experiments with Software Developers](https://www.microsoft.com/en-us/research/publication/the-effects-of-generative-ai-on-high-skilled-work-evidence-from-three-field-experiments-with-software-developers/).
- **[EN3]** GitHub / Accenture.
  [Research: Quantifying GitHub Copilot's impact in the enterprise](https://github.blog/news-insights/research/research-quantifying-github-copilots-impact-in-the-enterprise-with-accenture/).
- **[EN4]** DORA.
  [State of AI-assisted Software Development 2025](https://dora.dev/research/2025/dora-report/).
- **[EN5]** METR.
  [Early-2025 AI Experienced Open-Source Developer Study](https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/).
- **[EN6]** METR, 24-02-2026.
  [Measuring the impact of AI on experienced open-source developer productivity](https://metr.org/blog/2026-02-24-uplift-update/).

### Herramientas comparadas y figuras de autoridad

- **[C1]** Fission AI.
  [OpenSpec](https://github.com/Fission-AI/OpenSpec) y
  [release `v1.6.0`](https://github.com/Fission-AI/OpenSpec/releases/tag/v1.6.0).
- **[C2]** OpenGSD.
  [GSD Core](https://github.com/open-gsd/gsd-core),
  [release `v1.8.0`](https://github.com/open-gsd/gsd-core/releases/tag/v1.8.0) y
  [`package.json` de `v1.8.0`](https://github.com/open-gsd/gsd-core/blob/v1.8.0/package.json).
- **[C3]** Vincent, Jesse / `obra`.
  [Superpowers](https://github.com/obra/superpowers) y
  [release `v6.1.1`](https://github.com/obra/superpowers/releases/tag/v6.1.1).
- **[C4]** Vincent, Jesse.
  [Superpowers](https://blog.fsck.com/2025/10/09/superpowers/) y
  [Superpowers 6](https://blog.fsck.com/2026/06/15/Superpowers-6/).
