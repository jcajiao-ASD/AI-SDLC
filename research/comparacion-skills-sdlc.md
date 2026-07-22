---
id: comparacion-skills-sdlc
title: "Comparación de conjuntos de skills para un SDLC asistido por IA"
slug: comparacion-skills-sdlc
summary: "Compara OpenSpec, GitHub Spec Kit, Superpowers y Open GSD mediante lentes de adopción y piso de calidad."
category: metodologias
status: vigente
cutoffDate: "2026-07-22"
revalidateAfter: "2027-01-22"
evidenceLevel: mixta
decisionType: seleccion-framework
role: featured-source
featuredStory: seleccion-framework
relatedStories:
  - configurador-stack
---

# Comparación de conjuntos de skills para un SDLC asistido por IA: OpenSpec, GitHub Spec Kit, Superpowers y Open GSD

[<- volver al índice](_index.md)

> **Fecha de corte:** 22 de julio de 2026.  
> **Acceso a fuentes:** 22 de julio de 2026.  
> **Estado:** investigación vigente al corte; versiones, integraciones y señales
> de adopción deben revalidarse antes de una decisión y caducan en seis meses o
> dos ciclos de release relevantes, lo que ocurra primero.
>
> **Conclusión de evidencia:** **no existen ensayos controlados independientes,
> benchmarks reproducibles ni estudios longitudinales que comparen causalmente
> Open GSD (GSD Core), OpenSpec, GitHub Spec Kit y Superpowers.** Los estándares
> y la literatura citados validan las **prácticas** que cada framework
> institucionaliza —trazabilidad, TDD, revisión, supervisión humana—, no
> demuestran que un producto concreto produzca mejores resultados. Las
> evaluaciones del mantenedor se tratan como evidencia de confianza **baja a
> media**.

---

## Índice

1. [Conclusión ejecutiva](#1-conclusión-ejecutiva)
2. [Alcance y definiciones](#2-alcance-y-definiciones)
3. [Jerarquía de evidencia](#3-jerarquía-de-evidencia)
4. [Metodología de evaluación](#4-metodología-de-evaluación)
5. [Perfiles concisos de los cuatro candidatos](#5-perfiles-concisos-de-los-cuatro-candidatos)
6. [Comparación ponderada](#6-comparación-ponderada)
7. [Análisis por eje: dimensiones de adopción (E–J) y piso de calidad (A–D)](#7-análisis-por-eje-dimensiones-de-adopción-ej-y-piso-de-calidad-ad)
8. [Compensaciones (tradeoffs)](#8-compensaciones-tradeoffs)
9. [Ganador recomendado y por qué](#9-ganador-recomendado-y-por-qué)
10. [Mejor alternativa por escenario](#10-mejor-alternativa-por-escenario)
11. [Modelo operativo empresarial y piloto recomendado](#11-modelo-operativo-empresarial-y-piloto-recomendado)
12. [Limitaciones y validez](#12-limitaciones-y-validez)
13. [Referencias](#13-referencias)

---

## 1. Conclusión ejecutiva

La pregunta de decisión de este documento es concreta y refleja el perfil
declarado del equipo: **¿cuál de los cuatro conjuntos de skills soporta mejor una
adopción flexible, progresiva y liderada por humanos —con bajo costo de
capacitación, ceremonia y contexto— manteniendo como piso de calidad el control,
la precisión, la organización y la efectividad?**

Esto reemplaza como pregunta *primaria* a la formulación anterior ("cuál es la
mejor opción predeterminada para resultados controlados, precisos, organizados y
efectivos"), que se conserva como **lente secundaria** más abajo. **No son
resultados contradictorios: son dos preguntas de negocio distintas respondidas
con la misma evidencia mediante pesos distintos.**

Nota de nomenclatura: la solicitud original menciona "Speck Kit"; el nombre
oficial es **GitHub Spec Kit** [3]. Se usa el nombre oficial en adelante.

**Respuesta directa (lente primaria — adopción progresiva y liderada por
humanos).** Bajo un perfil que pondera seis dimensiones operativas de adopción
(flexibilidad, integración progresiva por fases, intervención humana granular,
capacitación/onboarding, facilidad de uso y bajo consumo de contexto/tokens) con
**65 %** del peso, y conserva control/precisión/organización/efectividad como
**piso de calidad al 35 %**, el **recomendado por defecto para este perfil es
OpenSpec**, con **66,1/100**. El orden completo es:

<!-- ai-sdlc-dataset: id=framework-adoption-ranking schema=weighted-ranking unit=score-100 -->
| Puesto | Framework | Puntaje adopción-first /100 | Confianza |
| ---: | --- | ---: | --- |
| 1 | **OpenSpec** | **66,1** | Media |
| 2 | GitHub Spec Kit | 59,6 | Media |
| 3 | Superpowers | 54,4 | Media |
| 4 | Open GSD / GSD Core | 47,8 | Media |
<!-- /ai-sdlc-dataset -->

OpenSpec lidera por diseño estructural verificado en fuente primaria: su modelo
**delta-first** (`openspec/specs/` vs. `openspec/changes/`) y su **perfil `core`
reducido** frente a un perfil ampliado opcional son el único mecanismo de
activación gradual documentado entre los cuatro; su filosofía "*enablers, not
gates*" minimiza los pasos obligatorios. La ventaja sobre Spec Kit es **moderada
(6,5 puntos)**, no aplastante (ver §6).

**Lente secundaria (piso de calidad A/B/C/D, pesos originales del marco 25/25/20/30).**
Con la pregunta anterior —control/precisión/organización/efectividad como objetivo
*único*— el orden se **invierte**: gana **Open GSD / GSD Core con 67,8/100**, y
**OpenSpec queda último con 46,6/100**:

<!-- ai-sdlc-dataset: id=framework-quality-ranking schema=weighted-ranking unit=score-100 -->
| Puesto | Framework | Puntaje piso-de-calidad /100 | Confianza |
| ---: | --- | ---: | --- |
| 1 | **Open GSD / GSD Core** | **67,8** | Media |
| 2 | Superpowers | 58,9 | Media |
| 3 | GitHub Spec Kit | 55,8 | Media |
| 4 | OpenSpec | 46,6 | Media |
<!-- /ai-sdlc-dataset -->

**Punto de equilibrio (aproximado).** El resultado depende de cuánto peso total se
asigne a las dimensiones de adopción frente al piso de calidad. Un barrido
continuo de 0 % a 100 % de peso de adopción (§6.6) sitúa los cruces así,
**aproximadamente**: por **debajo de ~33,5 %** lidera GSD Core; en la banda
angosta **~33,5 %–38,3 %** lidera GitHub Spec Kit por un margen mínimo; por
**encima de ~38,3 %** lidera OpenSpec y su margen crece de forma monótona. El
diseño base de este perfil (65 %) queda ~26,7 puntos porcentuales por encima del
cruce, un margen razonable, no ajustado al límite. La afirmación honesta **no** es
"OpenSpec gana siempre que se prioricen estos seis atributos", sino "OpenSpec gana
cuando el peso agregado de adopción supera aproximadamente 38 % del total".

**Advertencia crítica sobre el puntaje:** los valores son **ordinales y
documentales**, no porcentajes de rendimiento. Un 66,1 frente a un 59,6 indica
mayor densidad de atributos verificables en las fuentes bajo este perfil, **no** un
6,5 % de mejora de productividad, calidad o velocidad. Ningún candidato alcanzó 5
en ningún criterio, porque el ancla 5 exige evidencia independiente en proyectos
reales, y esa evidencia no existe (§12). En particular, **las afirmaciones de
menor consumo de tokens/contexto y de menor carga de capacitación no son hechos
medidos**: son inferencias estructurales de confianza baja (§4, §12).

**Advertencia crítica sobre el piso de calidad de OpenSpec.** OpenSpec tiene el
**piso de calidad preservado más débil de los cuatro (16,4/35, apenas 46,8 % del
bloque /35)**. Su "flexibilidad" es **control desplazado al equipo/plataforma**,
no control intrínseco adicional: OpenSpec **no toca Git**, **no orquesta
subagentes** y su `verify` es **opcional y normalmente no independiente del agente
que implementó**. Por eso, adoptar OpenSpec bajo este perfil **exige** gobernanza
externa determinista (§9, §11): ramas protegidas, PR y revisión humana
obligatorios, gates de CI, `openspec validate --all --strict` en CI, `verify`
obligatorio *por política*, `archive` atado a una convención de merge/deploy,
`CODEOWNERS`, escaneo de seguridad y permisos restringidos.

**Recomendaciones condicionales por perfil** (se conservan, no se colapsan en un
"depende"):

- **Adopción progresiva y liderada por humanos, brownfield, baja ceremonia,
  Git/CI ya gobernados fuera del agente:** **OpenSpec** + gobernanza externa
  obligatoria (§11).
- **Necesidad de gobierno de requisitos y trazabilidad documental auditable
  antes de construir:** GitHub Spec Kit (la alternativa más fuerte en este
  perfil).
- **Repositorios con pruebas maduras y foco en disciplina de implementación:**
  Superpowers (TDD obligatorio).
- **Regulado / control-first / orquestación autónoma end-to-end:** Open GSD /
  GSD Core, complementado con gates deterministas de plataforma (§11).

**Distinción importante (§9 y §11):** el "ganador entre los cuatro" para este
perfil es OpenSpec. La **pila empresarial más fuerte para este perfil** no es
ningún framework por sí solo, sino **OpenSpec como capa de especificación/cambio
+ controles deterministas externos de plataforma** —CI/CD con gates, ramas
protegidas, revisión humana obligatoria, `validate --strict`, medición DORA y
alineación con NIST SSDF—. Esos controles complementarios **no son un quinto
candidato ni un híbrido de los cuatro**; son la gobernanza de plataforma que
ninguno de los cuatro provee de forma determinista y que OpenSpec, por su diseño
"enablers, not gates", necesita más que ningún otro.

---

## 2. Alcance y definiciones

**Qué se compara.** Cuatro conjuntos de *skills*/proceso que se instalan sobre un
agente de codificación (por ejemplo GitHub Copilot CLI) para estructurar el
desarrollo: **Open GSD / GSD Core** [13][17], **OpenSpec** [18][20], **GitHub
Spec Kit** [1][3] y **Superpowers** [9][10]. Se los evalúa como **capas de
proceso**, no como LLM ni como agente anfitrión.

**Qué no se compara.** No se evalúan modelos, precios de tokens, ni el desempeño
crudo del agente subyacente. Ninguno de los cuatro modifica el modelo: todos
influyen mediante contexto, instrucciones, skills, plantillas y hooks.

**Versiones verificadas al corte:**

| Framework | Versión estable | Fecha | Runtime declarado |
| --- | --- | ---: | --- |
| GSD Core (Open GSD) | [1.7.0](https://github.com/open-gsd/gsd-core/releases/tag/v1.7.0) [17] | 15-07-2026 | Node >=22, npm >=10 |
| OpenSpec | [1.6.0](https://github.com/Fission-AI/OpenSpec/releases/tag/v1.6.0) [20] | 10-07-2026 | Node >=20.19.0 |
| GitHub Spec Kit | [v0.13.2](https://github.com/github/spec-kit/releases/tag/v0.13.2) [3] | 21-07-2026 | Python / `specify-cli` |
| Superpowers | [v6.1.1](https://api.github.com/repos/obra/superpowers/releases/tags/v6.1.1) [10] | 2026-06 | Depende del harness |

**Definiciones operativas de los cuatro objetivos:**

- **Controlado:** existen gates humanos verificables antes de acciones
  irreversibles, con trazabilidad de la decisión hacia la acción del agente y
  mitigación de *automation bias* [23][27][32].
- **Preciso:** los requisitos son necesarios, no ambiguos, verificables y
  trazables (ISO/IEC/IEEE 29148), con enlaces requisito → diseño → código →
  prueba y detección de *drift* [23][31].
- **Organizado:** cobertura explícita de las fases del ciclo (ISO/IEC/IEEE
  12207), gestión de configuración/cambios y roles claros por fase o subagente
  [24].
- **Efectivo:** las prácticas institucionalizadas tienen respaldo empírico,
  alineación plausible con métricas DORA y verificación obligatoria antes de dar
  por terminado el trabajo [28][34][35].

**Definiciones operativas de las seis dimensiones de adopción (perfil primario).**
Estas seis dimensiones (E–J) operacionalizan el perfil declarado del equipo y
concentran el 65 % del peso (§4); miden **atributos estructurales de diseño**, no
*enforcement* de gates:

- **Flexible (E):** independencia del agente/host y adaptabilidad a greenfield y
  brownfield sin exigir una orquestación propietaria ni documentar todo el
  sistema.
- **Progresivo por fases (F):** posibilidad de adoptarse en un cambio o módulo y
  de escalar la ceremonia gradualmente (perfiles/módulos activables), no
  todo-o-nada.
- **Intervención humana granular (G):** puntos de decisión humana repartidos en
  cada fase, no solo al final ni delegados a orquestación autónoma multiagente.
- **Capacitación/onboarding (H):** curva de aprendizaje baja y documentación
  orientada a que un equipo nuevo empiece rápido.
- **Facilidad de uso (I):** pocos pasos/artefactos obligatorios y libertad real
  de omitir lo opcional sin romper el flujo.
- **Bajo consumo de contexto/tokens (J):** diseño que evita cargar o documentar
  todo el sistema y minimiza ceremonia. **Nota de honestidad:** esta dimensión
  es la de menor confianza evidencial (§4, §12); no existe benchmark comparativo
  independiente de tokens, así que se trata como inferencia estructural de
  confianza **Baja**, sin porcentajes.

**Dos lentes, una evidencia.** El documento responde dos preguntas de negocio
distintas con los mismos valores 0–5: la **lente primaria** (adopción-first,
65 % E–J / 35 % A–D) y la **lente secundaria** (piso de calidad, 100 % A/B/C/D con
los pesos originales 25/25/20/30). Los A–D no se recalculan entre lentes: los
mismos valores se repesan (§4, §6).

---

## 3. Jerarquía de evidencia

Se distinguen cuatro tipos de evidencia y se les asigna peso probatorio distinto.
El marco prohíbe que la popularidad influya en el ranking.

1. **Evidencia específica del proyecto (primaria).** Repositorios, releases,
   plantillas y documentación oficiales de cada framework, verificados
   directamente [1]–[22]. Es la base del puntaje.
2. **Respaldo académico / de estándares (general).** ISO/IEC/IEEE 29148 y 12207,
   ISO/IEC 25010, NIST SSDF y AI RMF, SWEBOK, DORA/Accelerate, Bacchelli & Bird,
   Rafique & Misic, Gotel & Finkelstein, Parasuraman & Riley [23]–[35][42].
   **Validan prácticas, no productos**: no demuestran causalmente que ninguno de
   los cuatro sea superior.
3. **Afirmaciones del proveedor/mantenedor.** Blogs de autor, evaluaciones
   propias y testimonios [10][11][12]. Confianza **baja a media**; nunca elevan un
   criterio a 5.
4. **Señales de adopción (solo contexto).** Estrellas, forks, descargas.
   **Peso 0 %.** Miden visibilidad, no calidad de proceso; solo se usan como
   señal de riesgo de abandono, separadas del puntaje funcional.

> **No existen RCT ni benchmarks independientes** que aíslen el efecto de estos
> cuatro frameworks. Toda inferencia de efectividad es plausibilidad estructural
> respaldada por prácticas, no medición causal.

---

## 4. Metodología de evaluación

Se aplica el marco de 13 criterios, cuatro dimensiones y escala 0–5 definido en
el instrumento base [33]. Método Goal-Question-Metric: del objetivo se derivan
preguntas observables y luego se exige evidencia.

**Dimensiones y pesos:**

| Dim. | Nombre | Peso | Criterios (peso) |
| --- | --- | ---: | --- |
| A | Control y supervisión humana | 25 % | A1 gates humanos (10 %), A2 trazabilidad decisión→acción (8 %), A3 mitigación de *automation bias* (7 %) |
| B | Precisión y trazabilidad | 25 % | B1 calidad de requisitos 29148 (10 %), B2 enlaces bidireccionales (8 %), B3 persistencia/*drift* (7 %) |
| C | Organización del ciclo | 20 % | C1 cobertura de fases 12207 (10 %), C2 gestión de configuración/cambios (5 %), C3 roles por fase/subagente (5 %) |
| D | Efectividad y resultados | 30 % | D1 respaldo empírico de prácticas (10 %), D2 alineación DORA (8 %), D3 pruebas/inspección obligatorias (7 %), D4 credibilidad de evidencia propia (5 %) |

**Escala 0–5 (anclas resumidas):** 0 ausente; 1 aspiracional/marketing; 2
disponible pero opcional/omitible; 3 activo por defecto y verificable en
comandos/plantillas/config; 4 *enforcement* duro con evidencia directa
reproducible (mantenedor); 5 *enforcement* duro más evidencia independiente en
proyectos reales.

**Reglas aplicadas:** solo enteros o medios puntos; confianza Alta/Media/Baja por
juicio; ante duda entre dos anclas se usa la inferior; **ningún criterio llega a 5
solo con evidencia del mantenedor**; se reportan dimensiones y no solo el
compuesto; las diferencias **no** se interpretan como porcentajes de mejora.

**Fórmula:** `puntaje = Σ(peso_i × valor_i / 5)`, expresado sobre 100.

**Confianza global:** dado que la evidencia es documental y no hay estudios
independientes, la confianza del compuesto de cada framework es **Media** y
ningún criterio superó 4. La mayoría de los criterios de la dimensión A y D se
puntúan con confianza Media, y los de D4 (evidencia propia) con confianza
Media/Baja.

### 4.1 Perfil primario: pesos de adopción (E–J) más piso de calidad (A–D)

La lente primaria de este documento pondera seis dimensiones operativas de
adopción (E–J, 65 % en total) y conserva A/B/C/D como **piso de calidad
reescalado (35 % en total)**. A–D **no se repuntúan desde cero**: se reutilizan
los totales por dimensión ya publicados en §6.2 y se reescalan proporcionalmente
al nuevo peso, lo cual es matemáticamente equivalente a mantener cada subcriterio
0–5 con un peso menor (no cambia ningún valor ya sustentado).

**Dimensiones prioritarias de adopción (65 %):**

| ID | Peso | Criterio operacional |
| --- | ---: | --- |
| E1 | 7 % | Independencia del agente/host: no exige orquestación propietaria propia. |
| E2 | 5 % | Adaptabilidad greenfield **y** brownfield; cambios pequeños sin documentar todo. |
| F1 | 7 % | Adopción incremental en un cambio/módulo, no todo el proyecto de una vez. |
| F2 | 5 % | Escalado gradual de ceremonia (perfiles/módulos activables), no todo-o-nada. |
| G1 | 7 % | Puntos de decisión humana en cada fase, no solo al final ni delegados a autonomía multiagente. |
| G2 | 5 % | Bajo riesgo de ejecución desatendida de alcance amplio antes de intervención humana. |
| H1 | 6 % | Curva de aprendizaje baja: pocos comandos/conceptos nuevos. |
| H2 | 4 % | Documentación orientada a onboarding (quickstart, conceptos, ejemplos). |
| I1 | 6 % | Pocos pasos/artefactos obligatorios para un cambio mínimo viable. |
| I2 | 4 % | Libertad real de omitir pasos opcionales sin romper el flujo. |
| J1 | 5 % | Diseño explícito para minimizar contexto (alcance acotado, delta-first). |
| J2 | 4 % | Evidencia (aun de baja confianza) sobre tokens/ceremonia; se penalizan claims no verificados. |

**Restricciones de calidad preservadas (35 %, reescaladas del marco base):** A
control (10 %, de 25 %), B precisión (9 %, de 25 %), C organización (8 %, de 20 %),
D efectividad (8 %, de 30 %). A y D pierden más peso relativo que B y C porque el
perfil prioriza adopción incremental sobre gobierno documental duro y disciplina
de pruebas obligatoria; ninguna baja a 0 % y todas se reportan por separado como
piso (§5.2 de la comparación ponderada).

**Escala 0–5 propia para E–J (no la de *enforcement*).** Las dimensiones E–J
miden atributos estructurales de diseño (flexibilidad, incrementalidad,
distribución de intervención, curva de aprendizaje, ceremonia, huella de
contexto), no gates. Reutilizar la escala de *enforcement* de A–D sería un error;
se usa una escala propia con el mismo principio ("nada llega a 5 sin evidencia
independiente"): 0 ausente o contradicho por la fuente; 1 mención aspiracional
sin mecanismo; 2 mecanismo incidental o que exige trabajo adicional; 3
característica central y verificable en documentación/plantillas oficiales, sin
señal cruzada externa; 4 verificada en fuente primaria **más** alguna
verificación cruzada (múltiples artefactos primarios concordantes o comentario
de terceros no pagados); 5 verificada **más** evidencia independiente de uso real.
**Ningún subcriterio E–J supera 4,0** en este documento, porque para los cuatro
candidatos la evidencia es siempre primaria-del-proyecto en estas dimensiones.

**Advertencia evidencial específica de H, I y J.** Las afirmaciones de menor
carga de capacitación (H), mayor facilidad de uso (I) y menor consumo de
contexto/tokens (J) son **inferencias razonables** a partir de hechos
verificables (menos comandos/conceptos, perfiles configurables, `/opsx:onboard`,
diseño delta-first), **no hechos medidos**: no existe estudio de onboarding
controlado ni benchmark comparativo de tokens para ninguno de los cuatro. J1/J2
son la dimensión de menor confianza del perfil (J2 = **Baja**); no se usan
porcentajes de ahorro.

---

## 5. Perfiles concisos de los cuatro candidatos

### 5.1 Open GSD / GSD Core

Framework de ciclo completo `Discuss -> Plan -> Execute -> Verify -> Ship` con
artefactos persistentes en `.planning/`, requisitos identificados (`REQ-*`),
ejecución por olas, plan-checker en ocho dimensiones, verifier *goal-backward* y
UAT humana [13][14][15]. Es el de mayor cobertura *end-to-end* y el único con
orquestación multiagente propia (investigadores paralelos, planificador,
ejecutores, verifier). Contrapartidas: ceremonia alta, mayor consumo de
tokens/contexto y madurez pública muy reciente; el repositorio tenía cerca de dos
meses al corte y no hay estudios controlados sobre su eficacia [17].

### 5.2 GitHub Spec Kit

Toolkit MIT de GitHub para *Specification-Driven Development*. Flujo
`constitution -> specify -> clarify -> plan -> checklist -> tasks -> analyze ->
implement <-> converge` con artefactos revisables [1][2]. Es el más fuerte en
**gobierno de requisitos y trazabilidad documental**: `analyze` es *read-only* y
clasifica por severidad; `converge` es *append-only* y exige `source-ref`
[4][5][6]. Límites: los gates son convenciones, no bloqueos técnicos; las pruebas
son opcionales por defecto; no incorpora CI, despliegue, observabilidad,
revisión por diff ni orquestación propia de subagentes [6][7].

### 5.3 Superpowers

Conjunto de skills centrado en **disciplina de implementación**: diseño aprobado,
tareas de 2–5 minutos, TDD RED-GREEN-REFACTOR obligatorio, debugging por causa
raíz, revisión por tarea y `verification-before-completion` [9][12]. Sus *hard
gates* son conductuales (prompts, skills, hooks), no controles deterministas de
plataforma. Tiene menos gobierno persistente de requisitos/roadmap que Open GSD u
OpenSpec, y su estado operativo suele ser *scratch*/gitignored. Las afirmaciones
de "hasta 50 % más velocidad / 60 % menos costo" provienen del autor y **no
tienen replicación independiente** [11][12].

### 5.4 OpenSpec

Capa ligera de *spec-driven development* incremental. Separa comportamiento
vigente (`openspec/specs/`) de cambios propuestos (`openspec/changes/`) y permite
acordar antes de codificar sin documentar todo el sistema [18][19]. Filosofía
explícita "*enablers, not gates*": `verify` es opcional, **no gestiona Git ni CI**
y no orquesta subagentes [21]. Es el de menor ceremonia y mejor ajuste brownfield,
pero delega en la plataforma toda la gobernanza dura.

---

## 6. Comparación ponderada

Esta sección construye el resultado en dos pasos. Primero se puntúan los cuatro
candidatos en el **piso de calidad A–D** (§6.1–§6.2, base de ambas lentes) y en
las **seis dimensiones de adopción E–J** (§6.3). Luego se computa la **lente
primaria adopción-first** (§6.4), la **lente secundaria del piso de calidad**
(§6.5) y el **punto de equilibrio** entre ambas (§6.6). Los valores 0–5 de A–D
son idénticos en las dos lentes; solo cambian los pesos.

### 6.1 Puntajes por criterio del piso de calidad A–D (valor 0–5)

| Criterio (peso) | GSD Core | Superpowers | Spec Kit | OpenSpec |
| --- | ---: | ---: | ---: | ---: |
| A1 gates humanos (10 %) | 3,5 | 3,0 | 2,0 | 2,0 |
| A2 trazabilidad decisión→acción (8 %) | 3,5 | 2,5 | 3,0 | 3,0 |
| A3 mitigación *automation bias* (7 %) | 3,0 | 3,0 | 3,0 | 2,5 |
| B1 calidad de requisitos 29148 (10 %) | 3,5 | 3,0 | 4,0 | 3,0 |
| B2 enlaces bidireccionales (8 %) | 3,5 | 2,5 | 3,0 | 2,5 |
| B3 persistencia/*drift* (7 %) | 3,0 | 2,0 | 3,0 | 3,0 |
| C1 cobertura de fases 12207 (10 %) | 4,0 | 3,0 | 3,5 | 2,5 |
| C2 gestión de configuración/cambios (5 %) | 4,0 | 3,0 | 2,0 | 1,0 |
| C3 roles por fase/subagente (5 %) | 4,0 | 3,5 | 2,0 | 1,5 |
| D1 respaldo empírico de prácticas (10 %) | 3,5 | 3,5 | 3,0 | 2,5 |
| D2 alineación DORA (8 %) | 3,0 | 3,0 | 2,5 | 2,5 |
| D3 pruebas/inspección obligatorias (7 %) | 3,5 | 4,0 | 2,0 | 1,5 |
| D4 credibilidad de evidencia propia (5 %) | 1,5 | 2,0 | 2,0 | 1,5 |

Confianza por criterio: Alta en A1/D3/C2 (verificables directamente en
comandos/plantillas), Media en la mayoría, Media/Baja en D4 (evidencia propia).

### 6.2 Puntajes por dimensión del piso de calidad A–D (sobre el máximo de la dimensión)

| Dimensión (máx.) | GSD Core | Superpowers | Spec Kit | OpenSpec |
| --- | ---: | ---: | ---: | ---: |
| A — Control (25) | **16,8** | 14,2 | 13,0 | 12,3 |
| B — Precisión (25) | **16,8** | 12,8 | 17,0 | 14,2 |
| C — Organización (20) | **16,0** | 12,5 | 11,0 | 7,5 |
| D — Efectividad (30) | 18,2 | **19,4** | 14,8 | 12,6 |
| **Total /100** | **67,8** | 58,9 | 55,8 | 46,6 |

Observaciones: Spec Kit **supera** a Open GSD en la dimensión B (precisión
documental, 17,0 vs 16,8); Superpowers **supera** a todos en D (efectividad,
19,4) por su TDD obligatorio. En este piso de calidad (sin dimensiones de
adopción) Open GSD domina A y C y se mantiene alto en B y D, y OpenSpec es el más
débil. Estos son exactamente los totales por dimensión que la lente primaria
reescala como piso al 35 % (§6.4).

### 6.3 Puntajes por criterio de adopción E–J (valor 0–5)

Escala propia de E–J (§4.1); confianza Media salvo J2 (**Baja**). Ningún
subcriterio supera 4,0 porque la evidencia es primaria-del-proyecto.

| Criterio (peso) | GSD Core | Superpowers | Spec Kit | OpenSpec |
| --- | ---: | ---: | ---: | ---: |
| E1 independencia de host (7 %) | 2,0 | 3,0 | 4,0 | 4,0 |
| E2 adaptabilidad green/brownfield (5 %) | 2,0 | 2,5 | 3,0 | 4,0 |
| F1 adopción incremental sin todo el sistema (7 %) | 2,0 | 2,5 | 3,0 | 4,0 |
| F2 escalado por perfiles/módulos (5 %) | 1,5 | 2,0 | 2,0 | 4,0 |
| G1 decisión humana por fase (7 %) | 2,0 | 3,5 | 4,0 | 3,5 |
| G2 bajo riesgo de ejecución desatendida (5 %) | 1,5 | 2,5 | 3,0 | 4,0 |
| H1 curva de aprendizaje baja (6 %) | 1,5 | 2,5 | 2,0 | 4,0 |
| H2 documentación de onboarding (4 %) | 3,0 | 2,5 | 4,0 | 3,5 |
| I1 pocos pasos obligatorios (6 %) | 1,5 | 2,5 | 2,5 | 4,0 |
| I2 libertad de omitir pasos opcionales (4 %) | 2,0 | 2,0 | 3,5 | 4,0 |
| J1 diseño para bajo contexto (5 %) | 2,0 | 3,5 | 3,5 | 4,0 |
| J2 evidencia de consumo de tokens (4 %) | 1,0 | 1,5 | 2,0 | 2,5 |

Notas de las brechas mayores (§7 amplía): **E1** — OpenSpec y Spec Kit publican
listas de ~30 herramientas compatibles y no exigen su propia orquestación,
mientras GSD Core **es** su propia orquestación multiagente. **F1/F2** — el
perfil `core` de OpenSpec (`propose`, `explore`, `apply`, `sync`, `archive`)
frente al perfil ampliado opcional (`verify` y otros) es el único mecanismo de
activación gradual documentado. **G1** — aquí **Spec Kit supera a OpenSpec** (4,0
vs. 3,5): sus fases `analyze` (solo lectura) y `converge` (*append-only* con
`source-ref`) formalizan más los puntos de revisión que las convenciones más
informales de OpenSpec. **H2** — **Spec Kit también supera a OpenSpec** (4,0 vs.
3,5) por el respaldo documental de GitHub. **J2** — todas las celdas ≤2,5 y
confianza Baja: no hay medición de tokens independiente para ningún candidato;
Superpowers es el único con cifra propia ("hasta 50 %/60 %") pero sin
replicación, tratada como más cercana a marketing.

### 6.4 Lente primaria — compuesto adopción-first (65 % E–J / 35 % A–D)

Dimensiones de adopción (máx. 65):

| Dimensión (máx.) | GSD Core | Superpowers | Spec Kit | OpenSpec |
| --- | ---: | ---: | ---: | ---: |
| E Flexibilidad (12) | 4,8 | 6,7 | 8,6 | 9,6 |
| F Integración progresiva (12) | 4,3 | 5,5 | 6,2 | 9,6 |
| G Intervención humana (12) | 4,3 | 7,4 | 8,6 | 8,9 |
| H Capacitación/onboarding (10) | 4,2 | 5,0 | 5,6 | 7,6 |
| I Facilidad de uso (10) | 3,4 | 4,6 | 5,8 | 8,0 |
| J Bajo consumo de contexto (9) | 2,8 | 4,7 | 5,1 | 6,0 |
| **Subtotal /65** | **23,8** | **33,9** | **39,9** | **49,7** |

Piso de calidad preservado (máx. 35, reescalado de §6.2):

| Dimensión (máx.) | GSD Core | Superpowers | Spec Kit | OpenSpec |
| --- | ---: | ---: | ---: | ---: |
| A Control (10) | 6,72 | 5,68 | 5,20 | 4,92 |
| B Precisión (9) | 6,05 | 4,61 | 6,12 | 5,11 |
| C Organización (8) | 6,40 | 5,00 | 4,40 | 3,00 |
| D Efectividad (8) | 4,85 | 5,17 | 3,95 | 3,36 |
| **Subtotal /35** | **24,02** | **20,46** | **19,67** | **16,39** |
| **% del piso alcanzado** | 68,6 % | 58,5 % | 56,2 % | **46,8 %** |

Compuesto general (100 %):

| Puesto | Framework | Adopción /65 | Piso /35 | **Total /100** |
| ---: | --- | ---: | ---: | ---: |
| 1 | **OpenSpec** | 49,7 | 16,4 | **66,1** |
| 2 | GitHub Spec Kit | 39,9 | 19,7 | 59,6 |
| 3 | Superpowers | 33,9 | 20,5 | 54,4 |
| 4 | Open GSD / GSD Core | 23,8 | 24,0 | 47,8 |

OpenSpec lidera con **margen moderado (6,5 puntos sobre Spec Kit)**. Nótese la
tensión declarada: **OpenSpec gana el perfil de adopción pero tiene el piso de
calidad más débil (16,4/35, 46,8 %)** —el mismo resultado direccional que la
lente secundaria (§6.5)—; esa debilidad no se oculta, se compensa con gobernanza
externa obligatoria (§9, §11).

### 6.5 Lente secundaria — piso de calidad (A/B/C/D) y sensibilidad

Con la pregunta anterior (control/precisión/organización/efectividad como
objetivo único), Open GSD lidera y OpenSpec queda último. El marco original exige
recomputar con varios perfiles de pesos de A–D:

| Perfil de pesos (A/B/C/D) | GSD Core | Superpowers | Spec Kit | OpenSpec | Ganador |
| --- | ---: | ---: | ---: | ---: | --- |
| Base 25/25/20/30 | **67,8** | 58,9 | 55,8 | 46,6 | GSD Core |
| Iguales 25/25/25/25 | **68,8** | 58,8 | 56,1 | 46,4 | GSD Core |
| Control-first 40/30/15/15 | **68,1** | 57,2 | 56,9 | 48,6 | GSD Core |
| Efectividad-first 20/15/20/45 | **66,8** | 60,6 | 53,8 | 44,8 | GSD Core |

**Bajo la lente de piso de calidad, Open GSD gana en las cuatro configuraciones**
—es el resultado robusto de esa pregunta específica—. Esto **no** contradice la
lente primaria: son dos preguntas de negocio distintas. Si el objetivo real del
equipo es control/precisión/organización/efectividad dura por encima de la
adopción, esta es la lente aplicable y el ganador es GSD Core (§9, §10).

### 6.6 Punto de equilibrio entre las dos lentes (aproximado)

El ganador depende de cuánto peso total se asigne a las dimensiones de adopción
(E–J) frente al piso de calidad (A–D). Manteniendo fijas las proporciones
internas E:F:G:H:I:J = 12:12:12:10:10:9 y A:B:C:D = 10:9:8:8, un barrido continuo
de 0 % a 100 % de peso de adopción arroja:

<!-- ai-sdlc-dataset: id=framework-sensitivity schema=sensitivity-series unit=percent-weight -->
| Peso agregado de adopción (resto = piso de calidad) | Líder |
| --- | --- |
| 0 % – ~33,5 % | **GSD Core** |
| ~33,5 % – ~38,3 % | **GitHub Spec Kit** (banda angosta, margen mínimo) |
| ~38,3 % – 100 % | **OpenSpec** (margen creciente monótono) |
<!-- /ai-sdlc-dataset -->

El diseño base de la lente primaria (65 % de adopción) queda **~26,7 puntos
porcentuales por encima** del cruce hacia OpenSpec: margen razonable, no ajustado
al límite. **Este punto de equilibrio es una aproximación**, no un umbral exacto:
depende de la distribución interna elegida entre E–J y entre A–D; variarla
desplazaría el cruce en varios puntos porcentuales (limitación declarada, §12).
Superpowers no lidera en ningún punto del barrido, porque su ventaja comparativa
(D, efectividad/TDD) vive en el piso de calidad, no en la adopción.

---

## 7. Análisis por eje: dimensiones de adopción (E–J) y piso de calidad (A–D)

Bajo la lente primaria, las seis dimensiones de adopción (E–J) concentran el 65 %
del peso y los cuatro ejes clásicos (A–D) actúan como piso de calidad al 35 %.
Esta sección analiza primero por qué OpenSpec lidera la adopción (§7.0) y luego
conserva el análisis por eje del piso de calidad (§7.1–§7.4), donde el orden se
invierte a favor de Open GSD.

### 7.0 Dimensiones de adopción (E–J)

**Ganador de adopción: OpenSpec (49,7/65).** Lidera las seis dimensiones
agregadas, aunque **no todos los subcriterios** (Spec Kit lo supera en G1 y H2,
§6.3), lo que evidencia que el perfil no está ajustado para forzar su liderazgo.

- **E Flexibilidad (9,6/12) y F Integración progresiva (9,6/12) — sus dimensiones
  más altas.** El modelo delta-first (`openspec/specs/` vs. `openspec/changes/`)
  y el par perfil `core` reducido / perfil ampliado opcional son el único
  mecanismo documentado de activación gradual por perfiles entre los cuatro
  [18][19][21]. GSD Core, en cambio, **es** su propia orquestación multiagente y
  exige planificación completa antes de ejecutar; Spec Kit exige
  constitution→specify→plan→tasks como base fija.
- **G Intervención humana (8,9/12, apenas 0,3 sobre Spec Kit).** OpenSpec gana el
  agregado solo por G2 (menor riesgo de ejecución desatendida: no gestiona Git ni
  orquesta subagentes), pero **pierde G1 frente a Spec Kit** (4,0 vs. 3,5), cuyas
  fases `analyze`/`converge` formalizan más los puntos de revisión. Se reporta
  explícitamente esta derrota parcial.
- **H Onboarding (7,6/10) e I Facilidad de uso (8,0/10).** OpenSpec tiene el
  conjunto de comandos obligatorios más pequeño y la filosofía "*enablers, not
  gates*" (omitir pasos opcionales no rompe el flujo), frente a las 8–9 fases de
  Spec Kit y la ceremonia de GSD Core (`.planning/`, `REQ-*`, plan-checker de
  ocho dimensiones, waves, verifier, UAT). **Estas ventajas son inferencias
  razonables de "menos conceptos/comandos" y de `/opsx:onboard`, no un estudio de
  onboarding controlado** (no existe para ningún candidato).
- **J Bajo consumo de contexto (6,0/9, la más alta pero lejos del máximo).**
  OpenSpec es el único con diseño delta-first explícito para "reducir contexto
  innecesario", pero **no hay medición de tokens independiente para ningún
  candidato**: la ventaja es estructural/documental, de confianza **Baja**, sin
  porcentajes (§12).

**Lectura de flexibilidad:** la flexibilidad de OpenSpec es **control desplazado
al equipo/plataforma**, no control intrínseco adicional. No toca Git, no orquesta
subagentes y `verify` es opcional y normalmente no independiente del agente que
implementó [18][21]. Por eso su fortaleza de adopción **exige** el piso externo de
gobernanza (§9, §11).

### 7.1 Controlado (dimensión A del piso de calidad)

**Ganador: Open GSD (16,8/25).** Es el único con una secuencia de control activa
por defecto: plan-checker con hasta tres revisiones, verifier *goal-backward* y
**UAT humana** antes de *ship*, más gates configurables [13][14]. Superpowers
aporta gates conductuales fuertes (diseño aprobado, `verification-before-
completion`) pero dependientes de prompt, no de plataforma. Spec Kit y OpenSpec
puntúan bajo en A1 porque sus gates son convenciones (`analyze` recomienda pero
no bloquea; `verify` es opcional) [4][21].

**Límite común:** ninguno ofrece *enforcement* determinista de plataforma. Cuando
ejecutor y revisor comparten modelo e instrucciones, pueden compartir errores
—riesgo de *automation bias* documentado [32]—; por eso ningún criterio de A
supera 3,5 y la UAT/CI externas siguen siendo imprescindibles.

### 7.2 Preciso (dimensión B del piso de calidad)

**Ganador: GitHub Spec Kit (17,0/25).** `specify`/`clarify`/`checklist`/`analyze`
separan qué/por qué de cómo y añaden análisis de consistencia, lo que aproxima
mejor los atributos de calidad de requisitos de ISO/IEC/IEEE 29148 [2][4][23].
Open GSD queda muy cerca (16,8) con IDs `REQ-*` y la cadena requisito → fase →
plan → implementación → verificación persistida [15]. Ninguno enlaza
automáticamente requisito ↔ código ↔ commit ↔ prueba de forma completa (B2), y la
detección de *drift* es tesis de diseño, no mecanismo medido (B3) [31].

### 7.3 Organizado (dimensión C del piso de calidad)

**Ganador: Open GSD (16,0/20).** Cubre requisitos, arquitectura, planificación,
construcción, verificación y UAT, con gestión de commits/ramas/PR y roles
multiagente explícitos [13][17]. Spec Kit organiza muy bien los artefactos
previos a la implementación pero no toca Git ni orquesta subagentes [5][7].
OpenSpec es el más débil en C porque **nunca toca Git** y su compatibilidad con
~30 herramientas no es orquestación [21].

### 7.4 Efectivo (dimensión D del piso de calidad)

**Ganador: Superpowers (19,4/30).** Su TDD RED-GREEN-REFACTOR obligatorio y
`verification-before-completion` hacen que las pruebas/inspección sean requisito
para declarar éxito (D3 = 4,0), la práctica con respaldo empírico más directo
(Rafique & Misic; Janzen & Saiedian) [30][42]. Open GSD queda segundo (18,2) con
test gates y verifier activos por defecto. Spec Kit y OpenSpec pierden terreno
porque las pruebas son **opcionales** por defecto [6][21]. Ninguno alcanza 4 en
D2 (DORA) ni supera 2 en D4, porque la evidencia propia es escasa y no
independiente [34][35].

---

## 8. Compensaciones (tradeoffs)

| Eje | Open GSD | Superpowers | Spec Kit | OpenSpec |
| --- | --- | --- | --- | --- |
| Cobertura de ciclo | Casi completa | Media (diseño→cierre de rama) | Requisitos→implementación | Especificación→archivo |
| Ceremonia / costo de tokens | Alta | Media/alta | Media | Baja/media |
| *Enforcement* | Gates por defecto (no deterministas) | Gates conductuales fuertes | Convenciones | Habilitadores, no gates |
| Trazabilidad documental | Alta | Media | **Muy alta** | Media/alta |
| Disciplina de pruebas | Alta (por defecto) | **Muy alta (TDD obligatorio)** | Baja (opcional) | Baja (opcional) |
| Gestión de Git/PR | Sí (con controles) | Worktrees/cierre de rama | No | No |
| Madurez pública | Muy reciente | Alta actividad | Respaldado por GitHub | Joven, activo |
| Mejor ajuste | Features grandes multifase | Repos con pruebas maduras | Gobierno de requisitos | Brownfield incremental |
| Riesgo operativo | Alto | Medio/alto | Medio | Moderado |

Los niveles son valoración analítica, no medición. El patrón central: **más
control y organización implican más ceremonia y costo de contexto**; **más
ligereza implica delegar la gobernanza dura a la plataforma**. Bajo el perfil
primario (adopción-first) este tradeoff se resuelve a favor de la ligereza:
OpenSpec ocupa la esquina de mínima ceremonia y máxima adaptabilidad brownfield,
y **paga** ese posicionamiento con el piso de calidad más débil, que debe
reponerse con gobernanza externa (§9, §11). Bajo el perfil de piso de calidad el
tradeoff se resuelve al revés, a favor de Open GSD.

---

## 9. Ganador recomendado y por qué

**Recomendado por defecto para el perfil de adopción progresiva y liderada por
humanos: OpenSpec.**

Justificación basada en la evidencia y el puntaje (lente primaria, 66,1/100):

1. **Integración progresiva y flexibilidad por diseño.** El modelo delta-first y
   el par perfil `core` / perfil ampliado son el único mecanismo documentado de
   activación gradual por perfiles entre los cuatro; permiten empezar en un
   cambio o módulo sin instrumentar todo el sistema y sin exigir una orquestación
   propietaria [18][19][21]. Esto ataca directamente flexibilidad (E) e
   integración progresiva (F), las prioridades declaradas.
2. **Baja ceremonia y facilidad de uso.** Conjunto de comandos obligatorios más
   pequeño y filosofía "*enablers, not gates*": omitir pasos opcionales no rompe
   el flujo [18][21]. Frente a las 8–9 fases de Spec Kit y la ceremonia de GSD
   Core, esto reduce pasos obligatorios (I) y —como **inferencia razonable, no
   dato medido**— la carga de capacitación (H).
3. **Intervención humana granular.** Cada comando (`propose`, `apply`, `sync`) se
   invoca por separado y OpenSpec no orquesta subagentes ni ejecuta olas
   autónomas, lo que reparte los puntos de decisión humana y baja el riesgo de
   ejecución desatendida de alcance amplio (G2).
4. **Menor huella de contexto (cualitativa, confianza Baja).** El diseño
   delta-first evita documentar todo el sistema y por diseño reduce la superficie
   de contexto; **no existe benchmark comparativo de tokens**, así que esto es una
   inferencia estructural, no un ahorro medido, y no se expresa en porcentajes
   [18][19].

**Advertencia obligatoria — el piso de calidad más débil.** OpenSpec obtiene el
piso de calidad preservado más bajo de los cuatro (16,4/35, 46,8 %) y queda último
en la lente secundaria (46,6/100). Su "flexibilidad" es **control desplazado al
equipo/plataforma**, no control adicional: **no toca Git**, **no orquesta
subagentes** y su `verify` es **opcional y normalmente no independiente del agente
que implementó** [18][21]. Por eso, recomendar OpenSpec **exige** —no "sugiere"—
una capa externa de gobernanza determinista:

- Ramas protegidas y **PR obligatorio con revisión humana** antes de merge.
- **Gates de CI bloqueantes** (pruebas, lint, build).
- `openspec validate --all --strict` ejecutado en CI, no solo localmente.
- `verify` **obligatorio por política** (aunque el framework lo trate como opcional).
- `archive` **atado a una convención de merge/deploy**, no ejecutado a criterio del agente.
- **`CODEOWNERS`** para que la revisión humana prevalezca sobre la declaración del agente.
- **Escaneo de seguridad** alineado con NIST SSDF y mitigaciones OWASP
  (prompt injection, excessive agency) [26][38][39].
- **Permisos de shell/Git restringidos**; sin `/allow-all`.

Sin esta capa, un equipo pierde por completo el beneficio: la ligereza de OpenSpec
solo es segura sobre un Git/CI ya gobernado de forma madura.

**Por qué no gana cada alternativa bajo este perfil:**

- **GitHub Spec Kit** es la alternativa más fuerte (59,6): supera a OpenSpec en
  G1 (revisión humana formalizada) y H2 (documentación respaldada por GitHub) y
  tiene mejor piso de precisión (B). Pero exige una base fija de fases antes de
  adoptarse por partes, lo que lo deja detrás en integración progresiva (F) y
  facilidad de uso (I). Sigue siendo la mejor opción cuando el objetivo prioritario
  es **gobierno de requisitos y trazabilidad documental auditable**.
- **Superpowers** maximiza efectividad (TDD obligatorio) y por eso es fuerte en el
  piso de calidad, pero su perfil de adopción es intermedio (nunca el mejor ni el
  peor) y sus *hard gates* deliberadamente difíciles de omitir van en contra de la
  facilidad de uso priorizada. Ideal como **disciplina de implementación** en
  repos con pruebas maduras.
- **Open GSD / GSD Core** tiene el piso de calidad más alto (24,0/35) pero el
  perfil de adopción más bajo (23,8/65): su orquestación multiagente, su ceremonia
  y sus olas autónomas son exactamente lo contrario de "adopción progresiva y
  liderada por humanos". Es la mejor opción cuando el objetivo es **control-first,
  orquestación autónoma end-to-end o entornos regulados** (lente secundaria, §6.5).

**Distinción obligatoria — ganador vs. pila empresarial más fuerte.** El ganador
*entre los cuatro* para este perfil es OpenSpec. La **pila empresarial más fuerte
para este perfil** no es OpenSpec aislado, sino **OpenSpec como capa de
especificación/cambio + los controles deterministas externos** listados arriba.
Estos controles **no son un quinto candidato ni un híbrido de los cuatro
frameworks**: son gobernanza de plataforma que ninguno provee de forma
determinista, y que OpenSpec —por su diseño "enablers, not gates"— necesita más
que ningún otro. Debe evitarse presentar cualquier híbrido de frameworks como si
hubiese competido en el ranking.

---

## 10. Mejor alternativa por escenario

<!-- ai-sdlc-dataset: id=framework-profile-recommendations schema=profile-recommendation unit=categorical -->
| Clave de contexto | Escenario | Candidatos | Recomendación | Motivo | Caveat |
| --- | --- | --- | --- | --- | --- |
| `adopcion-progresiva` | **Adopción progresiva y liderada por humanos, brownfield, mínima ceremonia, Git/CI ya gobernados** | `primary:openspec` | **OpenSpec** + gobernanza externa obligatoria | Máxima flexibilidad, integración progresiva y facilidad de uso. | El piso de calidad se repone con controles deterministas de plataforma (§9, §11). |
| `gobierno-requisitos` | Gobierno de requisitos y auditoría documental antes de construir | `primary:spec-kit` | **GitHub Spec Kit** | Mayor precisión 29148, análisis de consistencia y revisión humana formalizada. | Introduce más fases y ceremonia que OpenSpec. |
| `tdd` | Repositorio con pruebas maduras, foco en disciplina de implementación | `primary:superpowers` | **Superpowers** | TDD obligatorio y revisión por tarea maximizan la disciplina de implementación. | Sus hard gates elevan ceremonia, tokens y latencia. |
| `regulado` | Equipo regulado, control-first, orquestación autónoma end-to-end | `primary:gsd-core` | **Open GSD** + gates deterministas de plataforma | Ofrece el piso de calidad y control por defecto más alto. | La integración y profundidad de hooks dependen del runtime. |
| `feature-grande` | Feature grande multiarchivo/multisesión con autonomía deseada | `primary:gsd-core` | **Open GSD** | Recuperación de contexto, olas y verificación integrada. | Mayor ceremonia y superficie operativa. |
| `hotfix` | Hotfix trivial / cambio mecánico reversible | `none:none` | Copilot directo + pruebas/revisión; quizá ningún framework | La ceremonia de cualquier framework supera el valor esperado. | La ausencia de framework no elimina pruebas, revisión ni controles de Git/CI. |
<!-- /ai-sdlc-dataset -->

<details>
<summary>Compatibilidad entre agentes y capas de especificación/proceso</summary>

“Nativa” significa que el proyecto documenta directamente ese runtime o genera
sus artefactos. “Condicionada” exige una opción de instalación, plugin o modo
skills. “No confirmada” conserva la ausencia de evidencia oficial como
incertidumbre, no como incompatibilidad.

<!-- ai-sdlc-dataset: id=agent-framework-compatibility schema=compatibility-matrix unit=categorical -->
| Clave de agente | Agente | Clave de componente | Componente | Estado | Mecanismo | Nota | Fuente | Verificado el |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `copilot-cli` | GitHub Copilot CLI | `openspec` | OpenSpec 1.6.0 | nativa | Skills en `.github/skills/openspec-*/SKILL.md` | Los prompt files son para IDE; Copilot CLI consume las skills. | <https://github.com/Fission-AI/OpenSpec/blob/v1.6.0/docs/supported-tools.md> | 2026-07-22 |
| `cursor` | Cursor | `openspec` | OpenSpec 1.6.0 | nativa | Skills y comandos bajo `.cursor/` | Integración documentada directamente por OpenSpec. | <https://github.com/Fission-AI/OpenSpec/blob/v1.6.0/docs/supported-tools.md> | 2026-07-22 |
| `junie` | Junie | `openspec` | OpenSpec 1.6.0 | nativa | Skills y comandos bajo `.junie/` | Integración documentada directamente por OpenSpec. | <https://github.com/Fission-AI/OpenSpec/blob/v1.6.0/docs/supported-tools.md> | 2026-07-22 |
| `opencode` | OpenCode | `openspec` | OpenSpec 1.6.0 | nativa | Skills y comandos bajo `.opencode/` | Integración documentada directamente por OpenSpec. | <https://github.com/Fission-AI/OpenSpec/blob/v1.6.0/docs/supported-tools.md> | 2026-07-22 |
| `copilot-cli` | GitHub Copilot CLI | `spec-kit` | GitHub Spec Kit 0.13.2 | condicionada | `--integration copilot --integration-options="--skills"` | El modo Copilot predeterminado aún genera prompts/agents heredados que no equivalen a skills de CLI. | <https://github.com/github/spec-kit/blob/v0.13.2/docs/reference/integrations.md> | 2026-07-22 |
| `cursor` | Cursor | `spec-kit` | GitHub Spec Kit 0.13.2 | nativa | Integración incorporada `cursor-agent` | Spec Kit la lista como integración soportada. | <https://github.com/github/spec-kit/blob/v0.13.2/docs/reference/integrations.md> | 2026-07-22 |
| `junie` | Junie | `spec-kit` | GitHub Spec Kit 0.13.2 | nativa | Integración incorporada `junie` | Spec Kit la lista como integración soportada. | <https://github.com/github/spec-kit/blob/v0.13.2/docs/reference/integrations.md> | 2026-07-22 |
| `opencode` | OpenCode | `spec-kit` | GitHub Spec Kit 0.13.2 | nativa | Integración incorporada `opencode` | Spec Kit la lista como integración soportada. | <https://github.com/github/spec-kit/blob/v0.13.2/docs/reference/integrations.md> | 2026-07-22 |
| `copilot-cli` | GitHub Copilot CLI | `superpowers` | Superpowers 6.1.1 | condicionada | Marketplace y plugin de Copilot | Requiere instalar el plugin; no es comportamiento incorporado del agente. | <https://github.com/obra/superpowers/blob/v6.1.1/README.md> | 2026-07-22 |
| `cursor` | Cursor | `superpowers` | Superpowers 6.1.1 | condicionada | Marketplace/plugin de Cursor | Requiere instalar el plugin en Cursor Agent. | <https://github.com/obra/superpowers/blob/v6.1.1/README.md> | 2026-07-22 |
| `junie` | Junie | `superpowers` | Superpowers 6.1.1 | no-confirmada | Sin integración oficial localizada | La release revisada documenta otros harnesses, pero no Junie. | <https://github.com/obra/superpowers/blob/v6.1.1/README.md> | 2026-07-22 |
| `opencode` | OpenCode | `superpowers` | Superpowers 6.1.1 | condicionada | Plugin propio de OpenCode | Requiere instalación y carga mediante el sistema de plugins/skills. | <https://github.com/obra/superpowers/blob/v6.1.1/.opencode/INSTALL.md> | 2026-07-22 |
| `copilot-cli` | GitHub Copilot CLI | `gsd-core` | GSD Core 1.7.0 | nativa | Instalador con destino `--copilot` | Runtime de primera clase con skills, instrucciones y hooks adaptados. | <https://github.com/open-gsd/gsd-core/blob/v1.7.0/docs/how-to/install-on-your-runtime.md> | 2026-07-22 |
| `cursor` | Cursor | `gsd-core` | GSD Core 1.7.0 | nativa | Instalador con destino `--cursor` | Runtime de primera clase con artefactos adaptados. | <https://github.com/open-gsd/gsd-core/blob/v1.7.0/docs/how-to/install-on-your-runtime.md> | 2026-07-22 |
| `junie` | Junie | `gsd-core` | GSD Core 1.7.0 | no-confirmada | Sin runtime Junie oficial localizado | La guía revisada no documenta un destino Junie. | <https://github.com/open-gsd/gsd-core/blob/v1.7.0/docs/how-to/install-on-your-runtime.md> | 2026-07-22 |
| `opencode` | OpenCode | `gsd-core` | GSD Core 1.7.0 | nativa | Instalador con destino `--opencode` | Runtime de primera clase con comandos, agentes, skills y plugin. | <https://github.com/open-gsd/gsd-core/blob/v1.7.0/docs/how-to/install-on-your-runtime.md> | 2026-07-22 |
<!-- /ai-sdlc-dataset -->

</details>

Estas recomendaciones condicionales **conviven** con el recomendado por defecto:
para el perfil de adopción declarado, OpenSpec es la elección predeterminada; los
demás ganan cuando su fortaleza específica (gobierno de requisitos, disciplina de
pruebas, control/orquestación autónoma) es el requisito central en lugar de la
adopción progresiva.

---

## 11. Modelo operativo empresarial y piloto recomendado

### 11.1 Pila recomendada (capa de especificación + controles deterministas externos)

Para el perfil de adopción progresiva y liderada por humanos, **la pila
empresarial más fuerte es OpenSpec como capa de especificación/cambio + controles
deterministas externos de plataforma**. La ligereza de OpenSpec solo es defendible
sobre esa capa externa, porque su piso de calidad es el más débil de los cuatro
(§6.4, §9).

1. **Capa primaria de especificación/cambio:** OpenSpec para acordar antes de
   codificar con deltas persistentes, adopción incremental por perfiles y mínima
   ceremonia.
2. **Controles deterministas externos (no son candidatos y no son opcionales):**
   - Ramas protegidas, PR obligatorio y **revisión humana** antes de merge; `CODEOWNERS`.
   - **CI/CD con gates bloqueantes** (pruebas, lint, build, escaneo de seguridad).
   - `openspec validate --all --strict` en CI; `verify` **obligatorio por
     política**; `archive` **atado a la convención de merge/deploy**.
   - Escaneo alineado con **NIST SSDF** y mitigaciones **OWASP** para *prompt
     injection* y *excessive agency* [26][38][39].
   - **Medición DORA** (lead time, frecuencia, *change failure rate*,
     recuperación) para evaluar impacto real [35].
   - Permisos de shell/Git restringidos; sin `/allow-all`.
3. **Alternativas según el objetivo dominante (no se mezclan en el ranking):**
   - Si el objetivo prioritario es **gobierno de requisitos**, sustituir OpenSpec
     por **GitHub Spec Kit** como capa primaria, manteniendo los mismos controles.
   - Si el repositorio ya tiene *harness* maduro, adoptar el patrón **TDD estricto
     de Superpowers** como práctica de implementación complementaria.
   - Si el objetivo es **control-first / orquestación autónoma**, la pila del perfil
     de piso de calidad usa **Open GSD** como primario (§6.5). Debe declararse
     explícitamente cuál perfil de negocio se está optimizando.

> Regla: la capa de especificación (OpenSpec) resuelve la adopción progresiva; la
> pila empresarial añade la gobernanza dura que OpenSpec, por diseño, **no**
> garantiza y necesita más que ningún otro candidato.

### 11.2 Piloto controlado de 30 días (adopción por fases)

El marco exige complementar la comparación con un piloto interno; sin él, los
puntajes son documentales. Para este perfil, el piloto debe **medir la adopción
por fases**, no solo la efectividad.

**Preparación (días 1–3):** fijar versiones (§2); crear ramas piloto; inventariar
archivos generados (`openspec/`); aprobar skills/perfiles; configurar el agente
sin permisos totales; **habilitar ya los controles externos** (ramas protegidas,
CI con `validate --strict`, `CODEOWNERS`); establecer *baseline* de al menos cinco
cambios recientes sin framework.

**Semanas 1–4 — adopción progresiva por capas de OpenSpec:**

1. **Fase 1 (explore/propose):** empezar solo con el perfil `core` de
   descubrimiento y propuesta de deltas en 2–3 cambios pequeños/medianos
   brownfield, sin activar el perfil ampliado.
2. **Fase 2 (apply):** añadir `apply`/`sync` con revisión humana antes de aplicar
   y PR obligatorio; medir intervenciones humanas y ceremonia.
3. **Fase 3 (verify/CI/archive obligatorios por política):** activar `verify`,
   los gates de CI bloqueantes y `archive` atado a merge/deploy; comparar defectos
   escapados y cobertura de requisitos frente a las fases anteriores.

**Semana 4 — evaluación.** Comparar por tamaño y tipo de cambio, no solo
promedios.

| Métrica | Cómo medir |
| --- | --- |
| Tiempo de onboarding | Horas hasta primer cambio productivo por persona nueva |
| Ceremonia | Pasos/artefactos obligatorios por cambio |
| Intervenciones humanas | Aprobaciones, correcciones, abortos por fase |
| Contexto / tokens | Créditos/tokens por cambio (medición interna, único dato real) |
| Lead time | Intención → PR listo/merge |
| Fallos CI | Primera ejecución y total |
| Cobertura de requisitos | Requisito → prueba/evidencia |
| Defectos escapados | Regresiones tras merge |
| Métricas DORA | Lead time, frecuencia, *change failure rate*, recuperación |
| Seguridad | Comandos no autorizados, secretos, dependencias dudosas |

**Umbrales internos (no promesas de producto):** cero acciones remotas/
destructivas no autorizadas; cero incremento de defectos escapados; 100 % de
cambios con CI y revisión humana; ≥90 % de requisitos con prueba o aceptación
humana explícita; ceremonia y costo dentro del límite acordado; **onboarding y
consumo de contexto medidos internamente** (única forma de convertir las
inferencias H/J en datos); valoración media del equipo ≥4/5 en claridad. Con 30
días **no habrá significancia estadística**; el resultado sirve para decidir si
ampliar, ajustar o detener.

---

## 12. Limitaciones y validez

- **No hay evidencia causal independiente.** No se localizaron ensayos
  controlados, benchmarks reproducibles ni estudios longitudinales que comparen
  los cuatro frameworks. Los puntajes son **ordinales y documentales**, derivados
  de fuentes primarias y de la plausibilidad de prácticas respaldadas por
  estándares; **no son porcentajes de rendimiento**.
- **Los estándares validan prácticas, no productos.** ISO/IEC/IEEE 29148 y 12207,
  NIST SSDF y AI RMF, SWEBOK, DORA, Bacchelli & Bird, Rafique & Misic, Gotel &
  Finkelstein y Parasuraman & Riley sustentan **trazabilidad, cobertura de ciclo,
  TDD, revisión y supervisión humana**; no demuestran que Open GSD, Superpowers,
  Spec Kit u OpenSpec produzcan causalmente mejores resultados [23]–[35][42].
- **Evidencia del mantenedor con confianza baja/media.** Las cifras de
  aceleración/ahorro de Superpowers y cualquier *benchmark* propio no tienen
  replicación independiente [11][12]; ningún criterio alcanzó 5 por esta razón.
- **Popularidad con peso 0.** Estrellas, forks y descargas son contexto de riesgo
  de abandono, no calidad; no influyen en el ranking. Se evitan cifras volátiles
  de adopción salvo como contexto fechado.
- **Riesgo de falso PASS.** UTBoost documentó 345 parches incorrectos aceptados
  por pruebas de SWE-bench: "PASS" en un Markdown o tests verdes autogenerados no
  bastan como evidencia; se requiere regresión, revisión humana y criterios
  externos [40]. METR reportó resultados mixtos y sesgos de selección en estudios
  de productividad con IA [41].
- **Vigencia.** La comparación caduca en seis meses o dos ciclos de release
  relevantes; debe complementarse con el piloto interno (§11).
- **El ganador depende de la lente, no es un veredicto único.** Bajo el perfil de
  adopción (primario) gana OpenSpec (66,1); bajo el piso de calidad (secundario)
  gana Open GSD (67,8). Ambos usan la misma evidencia con pesos distintos. El
  **punto de equilibrio (~38 % de peso de adopción) es una aproximación**, no un
  umbral exacto: depende de las proporciones internas elegidas entre E–J y entre
  A–D (§6.6), que no se recorrieron exhaustivamente. Ninguna lente debe
  presentarse como "la correcta" en abstracto; cada una responde una pregunta de
  negocio distinta.
- **Las afirmaciones de menor consumo de tokens/contexto no tienen medición
  independiente.** No existe benchmark comparativo reproducible de tokens, tiempo
  o costo por tarea equivalente entre los cuatro. La ventaja de OpenSpec en J es
  **estructural/documental (delta-first), de confianza Baja, sin porcentajes**;
  cualquier decisión que dependa fuertemente de "bajo consumo de tokens" requiere
  medición interna en el piloto (§11).
- **Las afirmaciones de menor carga de capacitación y facilidad de uso son
  inferencias, no hechos medidos.** Se derivan de hechos verificables (menos
  comandos/conceptos, perfiles configurables, `/opsx:onboard`), pero **no existe
  estudio de onboarding controlado** para ningún candidato; deben leerse como
  inferencias razonables de confianza Media, validables solo con el piloto.
- **El piso de calidad de OpenSpec es el más débil de los cuatro (46,8 % del
  bloque preservado).** Su flexibilidad es **control desplazado al
  equipo/plataforma**, no control adicional: no toca Git, no orquesta subagentes y
  `verify` es opcional y normalmente no independiente del agente que implementó.
  Adoptar OpenSpec **exige** la gobernanza externa de §9 y §11; sin ella el
  beneficio se pierde por completo.
- **Confianza global:** Media. **El resultado no es "robusto para cualquier
  peso"**: cambia según la lente y según el peso agregado asignado a la adopción;
  la magnitud de las diferencias no debe sobreinterpretarse como porcentajes de
  rendimiento.

---

## 13. Referencias

> Fecha de acceso a todas las fuentes: **22 de julio de 2026**.

### Fuentes primarias de los frameworks

- **[1]** GitHub. [`github/spec-kit` (repositorio)](https://github.com/github/spec-kit).
- **[2]** Delimarsky, Den. GitHub Blog, 02-09-2025.
  [Spec-driven development with AI: Get started with a new open source toolkit](https://github.blog/ai-and-ml/generative-ai/spec-driven-development-with-ai-get-started-with-a-new-open-source-toolkit/).
- **[3]** GitHub. [Spec Kit `v0.13.2` (release)](https://github.com/github/spec-kit/releases/tag/v0.13.2).
- **[4]** GitHub. [Comando `analyze` (v0.13.2)](https://github.com/github/spec-kit/blob/v0.13.2/templates/commands/analyze.md).
- **[5]** GitHub. [Comando `converge` (v0.13.2)](https://github.com/github/spec-kit/blob/v0.13.2/templates/commands/converge.md).
- **[6]** GitHub. [Plantilla de tareas (v0.13.2)](https://github.com/github/spec-kit/blob/v0.13.2/templates/tasks-template.md).
- **[7]** GitHub. [Integraciones (v0.13.2)](https://github.com/github/spec-kit/blob/v0.13.2/docs/reference/integrations.md).
- **[8]** GitHub. [Modelos de persistencia de especificaciones (v0.13.2)](https://github.com/github/spec-kit/blob/v0.13.2/docs/concepts/spec-persistence.md).
- **[9]** obra. [`obra/superpowers` (repositorio)](https://github.com/obra/superpowers).
- **[10]** obra. [Superpowers `v6.1.1` (API de release)](https://api.github.com/repos/obra/superpowers/releases/tags/v6.1.1).
- **[11]** Prime Radiant. [`superpowers-evals`](https://github.com/prime-radiant-inc/superpowers-evals) y [primeradiant.com/superpowers](https://primeradiant.com/superpowers/).
- **[12]** Keith, Jesse (obra). Blog. [Superpowers](https://blog.fsck.com/2025/10/09/superpowers/) y [Superpowers 6](https://blog.fsck.com/2026/06/15/Superpowers-6/).
- **[13]** Open GSD. [Introducción a GSD Core](https://docs.opengsd.net/core/introduction).
- **[14]** Open GSD. [Workflow](https://docs.opengsd.net/core/concepts/workflow).
- **[15]** Open GSD. [Artefactos de planificación](https://docs.opengsd.net/core/concepts/planning-artifacts).
- **[16]** Open GSD. [Instalación](https://docs.opengsd.net/core/installation).
- **[17]** Open GSD. [`open-gsd/gsd-core` (repositorio)](https://github.com/open-gsd/gsd-core) y [release `v1.7.0`](https://github.com/open-gsd/gsd-core/releases/tag/v1.7.0).
- **[18]** Fission AI. [`Fission-AI/OpenSpec` (repositorio)](https://github.com/Fission-AI/OpenSpec).
- **[19]** OpenSpec. [Documentación](https://openspec.dev/docs).
- **[20]** OpenSpec. [Release `v1.6.0`](https://github.com/Fission-AI/OpenSpec/releases/tag/v1.6.0).
- **[21]** OpenSpec. [Herramientas soportadas (v1.6.0)](https://github.com/Fission-AI/OpenSpec/blob/v1.6.0/docs/supported-tools.md).
- **[22]** GitHub. [Matriz de personalización de Copilot](https://docs.github.com/en/copilot/reference/customization-cheat-sheet).

### Estándares, autoridades y evidencia académica (validan prácticas, no productos)

- **[23]** ISO/IEC/IEEE. [29148:2018 — Requirements engineering](https://www.iso.org/standard/72089.html).
- **[24]** ISO/IEC/IEEE. [12207:2017 — Software life cycle processes](https://www.iso.org/standard/63712.html).
- **[25]** ISO/IEC. [25010:2023 — Product quality model](https://www.iso.org/standard/78176.html).
- **[26]** NIST. [SSDF, SP 800-218](https://csrc.nist.gov/pubs/sp/800/218/final).
- **[27]** NIST. [AI RMF 1.0](https://doi.org/10.6028/NIST.AI.100-1).
- **[28]** IEEE Computer Society. [SWEBOK v4.0](https://www.computer.org/education/bodies-of-knowledge/software-engineering/v4).
- **[29]** Bacchelli, A.; Bird, C. (2013). [Expectations, Outcomes, and Challenges of Modern Code Review](https://doi.org/10.1109/ICSE.2013.6606617).
- **[30]** Rafique, Y.; Misic, V. (2013). [The Effects of Test-Driven Development on External Quality and Productivity: A Meta-Analysis](https://doi.org/10.1109/TSE.2012.28).
- **[31]** Gotel, O.; Finkelstein, A. (1994). [An Analysis of the Requirements Traceability Problem](https://discovery.ucl.ac.uk/id/eprint/749/).
- **[32]** Parasuraman, R.; Riley, V. (1997). [Humans and Automation: Use, Misuse, Disuse, Abuse](https://web.mit.edu/16.459/www/parasuraman.pdf).
- **[33]** Basili, V. et al. [Goal-Question-Metric Paradigm](https://www.cs.umd.edu/~basili/publications/technical/T78.pdf).
- **[34]** Forsgren, N.; Humble, J.; Kim, G. [Accelerate](https://itrevolution.com/product/accelerate/).
- **[35]** Google Cloud / DORA. [2025 DORA report: AI-assisted software development](https://cloud.google.com/resources/content/2025-dora-ai-assisted-software-development-report).
- **[36]** GitHub. [Copilot code review](https://docs.github.com/en/copilot/concepts/agents/code-review).
- **[37]** Microsoft. [Responsible AI — Engineering Playbook](https://microsoft.github.io/code-with-engineering-playbook/ml-and-ai-projects/responsible-ai/).
- **[38]** OWASP. [LLM01: Prompt Injection](https://genai.owasp.org/llmrisk/llm01-prompt-injection/).
- **[39]** OWASP. [LLM06: Excessive Agency](https://genai.owasp.org/llmrisk/llm062025-excessive-agency/).
- **[40]** UTBoost (ACL 2025). [Rigorous evaluation of coding agents on SWE-bench](https://aclanthology.org/2025.acl-long.189/).
- **[41]** METR (2025). [Measuring the impact of early-2025 AI on experienced open-source developer productivity](https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/).
- **[42]** Janzen, D.; Saiedian, H. (2005). [Test-Driven Development: Concepts, Taxonomy, and Future Direction](https://doi.org/10.1109/MC.2005.314).
- **[43]** Böckeler, B. Martin Fowler / Thoughtworks. [Understanding Spec-Driven Development: Kiro, spec-kit, and Tessl](https://martinfowler.com/articles/exploring-gen-ai/sdd-3-tools.html).
