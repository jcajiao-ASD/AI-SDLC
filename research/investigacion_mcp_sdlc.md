# Model Context Protocol (MCP) para agentes de codificación y el SDLC

[<- volver al índice](_index.md)

> **Estado:** Vigente. Investigación con corte al **21 de julio de 2026**.
>
> **Pregunta central:** qué es MCP, qué beneficios y responsabilidades implica,
> cuánto ayuda realmente a los agentes de codificación, cómo medirlo y si es una
> tecnología durable o será reemplazada.
>
> **Conclusión ejecutiva:** MCP ya es el estándar abierto dominante para conectar
> agentes con herramientas y datos, pero **no es una garantía de agenticidad ni
> de productividad**. La evidencia disponible demuestra adopción, portabilidad y
> capacidad de integración; también muestra tasas de éxito todavía bajas en
> tareas MCP realistas, costos de contexto y riesgos graves de seguridad. Para el
> portafolio propuesto deben preferirse los servidores oficiales de Jira,
> GitHub, SonarQube y AWS/GCP, comenzar en modo de solo lectura y medir el valor
> incremental con un experimento controlado.

---

## Índice

1. [Respuesta corta](#1-respuesta-corta)
2. [Metodología y calidad de la evidencia](#2-metodología-y-calidad-de-la-evidencia)
3. [Qué es MCP](#3-qué-es-mcp)
4. [Qué problema resuelve y qué no resuelve](#4-qué-problema-resuelve-y-qué-no-resuelve)
5. [Beneficios y costos](#5-beneficios-y-costos)
6. [Evidencia cuantitativa](#6-evidencia-cuantitativa)
7. [¿MCP seguirá existiendo?](#7-mcp-seguirá-existiendo)
8. [Estado de las integraciones objetivo](#8-estado-de-las-integraciones-objetivo)
9. [Arquitectura recomendada para el SDLC](#9-arquitectura-recomendada-para-el-sdlc)
10. [Cómo crear un servidor MCP](#10-cómo-crear-un-servidor-mcp)
11. [Responsabilidades de quien crea u opera un servidor](#11-responsabilidades-de-quien-crea-u-opera-un-servidor)
12. [Seguridad y gobierno](#12-seguridad-y-gobierno)
13. [Cómo medir la influencia en agentes de codificación](#13-cómo-medir-la-influencia-en-agentes-de-codificación)
14. [Plan de adopción](#14-plan-de-adopción)
15. [Recomendación final](#15-recomendación-final)
16. [Limitaciones y revalidación](#16-limitaciones-y-revalidación)
17. [Referencias](#17-referencias)

---

## 1. Respuesta corta

### 1.1 ¿Qué es?

**Model Context Protocol (MCP)** es un protocolo abierto para que una aplicación
de IA descubra y utilice datos, herramientas y flujos expuestos por sistemas
externos. Usa una arquitectura host-cliente-servidor, mensajes JSON-RPC 2.0 y
dos transportes estándar: `stdio` para procesos locales y **Streamable HTTP**
para servicios remotos [M1, M2].

No es un modelo, un agente ni un framework de orquestación. Es una **capa de
interoperabilidad**:

```text
usuario
  -> agente / host de IA
       -> cliente MCP
            -> servidor MCP
                 -> Jira, GitHub, SonarQube, AWS, GCP u otro sistema
```

### 1.2 ¿Ayuda a la agenticidad?

**Sí, como habilitador; no, como garantía.** MCP puede dar al agente:

- contexto actualizado y verificable;
- acciones reales sobre sistemas del SDLC;
- una interfaz portable entre distintos hosts y modelos;
- esquemas que reducen la ambigüedad de las llamadas;
- mejor trazabilidad que una colección informal de scripts.

Sin embargo, el éxito sigue dependiendo del modelo, el harness, la selección de
herramientas, los permisos, la calidad del servidor y la claridad de la tarea.
En MCP-Universe, el mejor modelo evaluado resolvió solo **43,72 %** de las tareas
realistas; MCP hizo posible el acceso a las herramientas, pero no eliminó los
fallos de planificación, contexto largo o uso de herramientas desconocidas [A1].

### 1.3 ¿Seguirá existiendo?

La evidencia favorece **continuidad con evolución**, no reemplazo:

- fue donado a la Agentic AI Foundation de la Linux Foundation;
- lo respaldan competidores directos como Anthropic, OpenAI, Google, Microsoft,
  AWS, Block y Cloudflare;
- tiene gobernanza formal mediante SEPs, grupos de trabajo y política de
  deprecación;
- su roadmap de marzo de 2026 prioriza escalabilidad, comunicación de agentes,
  gobierno y preparación empresarial [I2, I3, I6].

Lo que sí cambiará son primitivas, empaquetados y patrones. Por ejemplo,
SEP-2577 aprobó deprecar `roots`, `sampling` y el logging del protocolo en la
siguiente revisión estable; AWS reemplaza gradualmente su colección experimental
de AWS Labs por **Agent Toolkit for AWS**, pero ese toolkit conserva un servidor
MCP administrado [I7, C4]. Esto es evolución alrededor y dentro de MCP, no
evidencia de que el protocolo vaya a desaparecer.

### 1.4 Decisión para este proyecto

1. Usar servidores **oficiales** antes de construir conectores propios.
2. Empezar con Jira, GitHub, SonarQube y observabilidad cloud en **solo lectura**.
3. Separar identidades, toolsets y permisos por sistema y ambiente.
4. Habilitar escrituras únicamente con aprobación humana y acciones acotadas.
5. Medir MCP contra una integración no-MCP equivalente; no contra “ningún
   acceso”, porque esa comparación confunde el valor del protocolo con el valor
   de tener herramientas.

---

## 2. Metodología y calidad de la evidencia

La investigación combina fuentes con distinta fuerza:

| Nivel | Fuentes | Uso en este documento |
| --- | --- | --- |
| **A — Evidencia primaria medible** | Papers, benchmarks reproducibles, especificación y repositorios oficiales | Cifras de rendimiento, seguridad, arquitectura y comportamiento |
| **B — Fuente oficial de industria** | Anthropic, Linux Foundation, GitHub, Atlassian, SonarSource, AWS, Google | Adopción, estado de producto, roadmap y prácticas recomendadas |
| **C — Autoridad técnica** | Creadores, mantenedores y líderes técnicos citados en fuentes oficiales | Interpretación de dirección y adopción |
| **D — Inferencia** | Síntesis de las fuentes anteriores | Pronóstico y recomendación, identificados expresamente como inferencia |

### Reglas aplicadas

- Las métricas de proveedores se presentan como **auto-reportadas**, no como
  auditorías independientes.
- SWE-bench y los estudios generales de productividad se tratan como evidencia
  **indirecta**, porque no aíslan MCP.
- No se encontró un estudio causal que compare, sobre las mismas tareas,
  **MCP contra una integración ad hoc equivalente**. Por ello no existe una
  cifra pública defendible de “MCP mejora la productividad X %”.
- Se descartaron cifras sin fuente primaria verificable y leaderboards con
  nombres o resultados no confirmados.

---

## 3. Qué es MCP

### 3.1 Arquitectura

| Componente | Responsabilidad |
| --- | --- |
| **Host MCP** | Aplicación de IA que administra al modelo, permisos, contexto y experiencia de usuario |
| **Cliente MCP** | Mantiene una conexión dedicada con un servidor, negocia capacidades y transporta mensajes |
| **Servidor MCP** | Expone capacidades de un sistema externo mediante interfaces estandarizadas |
| **Sistema de origen** | API, base de datos, repositorio, plataforma SaaS o infraestructura que conserva la autoridad real |

Un host crea normalmente un cliente por cada servidor conectado. El servidor
puede ser local, como un proceso `stdio`, o remoto, como un endpoint HTTP
administrado por un proveedor [M1].

### 3.2 Primitivas principales

| Primitiva | Quién decide usarla | Propósito | Ejemplo SDLC |
| --- | --- | --- | --- |
| **Tool** | Modelo, sujeto a controles del host | Ejecutar una operación tipada | Crear un issue, consultar un quality gate, reiniciar una instancia |
| **Resource** | Aplicación/host | Entregar contexto principalmente pasivo | Esquema, documentación, política, contenido de un issue |
| **Prompt** | Usuario | Ofrecer una plantilla reutilizable | “Preparar un plan de corrección de vulnerabilidades” |
| **Task** | Servidor y cliente que soporten la extensión | Representar trabajo asíncrono durable | Esperar CI, despliegue, escaneo o aprobación humana |

Las tools usan JSON Schema para entradas y salidas. En la especificación
estable 2025-11-25, JSON Schema 2020-12 es el dialecto predeterminado [M3, M4].

### 3.3 Transportes

- **`stdio`:** el cliente inicia el servidor como subproceso. Es apropiado para
  herramientas locales, desarrollo y aislamiento por proceso. `stdout` queda
  reservado para mensajes MCP; los logs deben ir por `stderr`.
- **Streamable HTTP:** un servicio remoto ofrece un único endpoint para `POST` y
  `GET`, con SSE opcional. Debe validar `Origin`, usar autenticación y enlazarse
  solo a loopback cuando se ejecute localmente [M2].

### 3.4 Autorización

Para HTTP, MCP modela al servidor protegido como **OAuth Resource Server**. La
especificación 2025-11-25 usa OAuth 2.1, Protected Resource Metadata
(RFC 9728), discovery de OAuth/OIDC y recomienda scopes de mínimo privilegio.
Para `stdio`, las credenciales suelen obtenerse del entorno y no debe copiarse
sin más el flujo OAuth remoto [M5].

---

## 4. Qué problema resuelve y qué no resuelve

### 4.1 Problema que sí resuelve

Sin estándar, `n` agentes y `m` sistemas pueden requerir hasta `n x m`
integraciones específicas. MCP desacopla ambos lados:

```text
Antes:
Agente A -> conector GitHub A
Agente B -> conector GitHub B
Agente C -> conector GitHub C

Con MCP:
Agentes A/B/C -> cliente MCP -> servidor GitHub MCP
```

Esto reduce duplicación y facilita cambiar de agente o modelo sin reconstruir
cada integración [I1].

### 4.2 Problemas que no resuelve

MCP no garantiza:

- que el modelo elija la herramienta correcta;
- que construya bien los argumentos;
- que complete una trayectoria de varios pasos;
- que el servidor sea seguro o confiable;
- que los permisos concedidos sean adecuados;
- que el resultado del sistema externo sea verdadero o suficiente;
- que el uso de IA aumente la productividad del equipo.

Tampoco reemplaza:

- OpenAPI o los SDKs del sistema de origen;
- CI, pruebas, SAST, observabilidad o revisión humana;
- identidad, IAM, gestión de secretos o un gateway empresarial;
- A2A para comunicación entre agentes;
- skills, que describen procedimientos reutilizables.

---

## 5. Beneficios y costos

### 5.1 Beneficios

| Beneficio | Mecanismo | Cómo se manifiesta en el SDLC |
| --- | --- | --- |
| **Portabilidad** | Interfaz común entre hosts y servidores | El mismo servidor puede ser usado desde varios agentes compatibles |
| **Contexto vigente** | Consulta al sistema fuente en tiempo de ejecución | El agente ve el issue, PR, quality gate o estado cloud actual |
| **Acción estructurada** | Tools con schemas | Menos dependencia de parsear texto de una CLI o UI |
| **Descubribilidad** | `tools/list`, `resources/list`, Registry | El host puede conocer capacidades sin integración codificada a mano |
| **Composición** | Varios servidores bajo un host | Flujo Jira -> GitHub -> SonarQube -> nube |
| **Gobierno centralizable** | OAuth/IAM, toolsets, allowlists y logs | Permisos y auditoría consistentes |
| **Menor lock-in del agente** | Estándar neutral y SDKs multilenguaje | Cambiar el harness sin rehacer cada backend |

### 5.2 Costos y contrapartidas

| Costo | Efecto |
| --- | --- |
| **Más contexto** | Las definiciones y resultados de tools consumen tokens y elevan latencia |
| **Más superficie de ataque** | Tool poisoning, prompt injection, robo de credenciales y confused deputy |
| **No determinismo** | El modelo puede seleccionar o secuenciar mal tools válidas |
| **Carga operacional** | Versionado, observabilidad, rate limits, compatibilidad y soporte |
| **Riesgo agregado** | Un mismo agente puede unir datos y permisos de varios sistemas |
| **Variación entre hosts** | No todos implementan las mismas extensiones o UX de aprobación |

Anthropic mostró un caso de ingeniería donde la carga bajo demanda y ejecución
de código redujo el contexto de tools de **150.000 a 2.000 tokens (98,7 %)**.
Es una medición del proveedor sobre un patrón concreto, no un benchmark
independiente ni una propiedad automática de MCP [I8].

---

## 6. Evidencia cuantitativa

### 6.1 Qué mide MCP directamente

| Estudio | Alcance | Resultado relevante | Interpretación |
| --- | --- | --- | --- |
| **MCP-Universe** (Salesforce AI Research) | Servidores reales, seis dominios y evaluación por ejecución | GPT-5 **43,72 %**, Grok-4 **33,33 %**, Claude 4 Sonnet **29,44 %** de éxito | La herramienta estandarizada existe, pero el agente aún falla en más de la mitad de tareas |
| **MCP-Bench** (Accenture) | 28 servidores vivos, 250 tools, 20 LLMs y tareas multi-hop | Reporta retos persistentes de descubrimiento, planificación y ejecución | Evalúa trayectorias reales; el abstract no ofrece una cifra agregada única |
| **MCPToolBench++** (Ant Group) | >4.000 servidores del marketplace, 1.500 pares y llamadas de hasta 10 tools | La tasa de éxito varía fuertemente entre servidores reales | La calidad del servidor es parte del resultado, no solo el modelo |
| **MCP-RADAR** | 507 tareas y seis dominios | Mide precisión, selección de tool, parámetros, recursos y velocidad | Un único pass rate oculta trade-offs entre precisión y eficiencia |
| **Caracterización de Cline** | Tokens, costo, tiempo y éxito en flujos MCP | Interacciones prompt-heavy, poca paralelización y agentes que pueden quedar atascados | Se requieren límites, abortos y selección progresiva de tools |
| **MCPTox** | 45 servidores, 353 tools y 1.312 casos maliciosos | Tasa máxima de ataque **>72 %**; rechazo máximo **<3 %** | Los guardrails del modelo no bastan para proteger un entorno MCP |

Fuentes: [A1-A6].

### 6.2 Lo que estas cifras no demuestran

Los benchmarks anteriores miden la capacidad de un **modelo + agente + servidor
MCP + tarea**. No tienen un brazo equivalente con la misma API expuesta mediante
una integración no-MCP. Por tanto:

```text
43,72 % de éxito con MCP
!=
43,72 % de mejora causada por MCP
```

La contribución causal del protocolo sigue sin cuantificarse públicamente.

### 6.3 Evidencia indirecta sobre agentes de codificación

SWE-bench mide el porcentaje de issues reales resueltos por un agente, pero no
MCP. Sirve para evaluar el harness y el modelo antes de añadir integraciones,
no para atribuir resultados al protocolo [A7].

METR ofrece una advertencia metodológica importante:

- En su RCT de inicios de 2025, 16 desarrolladores experimentados tardaron
  **19 % más** con IA; esperaban una mejora del 24 % y después todavía creían
  haber mejorado 20 % [A8].
- La actualización de febrero de 2026 considera ese resultado envejecido. Sus
  datos posteriores sugieren **18 % de aceleración** para participantes
  anteriores y **4 %** para nuevos, pero los intervalos incluyen cero y METR
  considera la señal poco fiable por selección de participantes y tareas [A9].

Conclusión: percepción, benchmark y productividad real pueden divergir. La
evaluación MCP debe usar telemetría objetiva y no solo encuestas.

### 6.4 Señales de adopción

Según Anthropic, al donar MCP a la Linux Foundation en diciembre de 2025
existían [I2]:

- más de **10.000 servidores públicos activos**;
- más de **97 millones de descargas mensuales** de los SDK de Python y
  TypeScript;
- más de **75 conectores** en el directorio de Claude.

El blog oficial del primer aniversario informó cerca de **2.000 entradas** en el
Registry y crecimiento de **407 %** desde su lote inicial [I4].

Son señales fuertes de adopción, pero son cifras auto-reportadas y corresponden
a finales de 2025; no se encontró una auditoría independiente ni una cifra
posterior equivalente antes del corte.

---

## 7. ¿MCP seguirá existiendo?

### 7.1 Evidencia a favor de permanencia

1. **Gobernanza neutral:** MCP fue donado a AAIF, bajo Linux Foundation, con
   Anthropic, Block y OpenAI como cofundadores y respaldo de Google, Microsoft,
   AWS, Cloudflare y Bloomberg [I2].
2. **Adopción de competidores:** OpenAI, Google, Microsoft/GitHub y AWS soportan
   un estándar originado por Anthropic.
3. **Gobernanza formal:** SEPs, maintainers, core maintainers, lead maintainers,
   steering group y reuniones públicas [I3].
4. **Roadmap activo en 2026:** transporte stateless, Server Cards, Tasks,
   auditoría, auth empresarial, gateways, configuración portable, seguridad y
   conformance tests [I6].
5. **Productos oficiales:** los cuatro dominios objetivo ya tienen oferta MCP
   oficial o administrada.

### 7.2 Qué puede reemplazarse

| Elemento | Pronóstico basado en evidencia |
| --- | --- |
| **Protocolo MCP** | Probable continuidad y evolución |
| **Primitivas individuales** | Pueden deprecarse; `roots`, `sampling` y logging ya tienen una SEP final de deprecación |
| **Servidores experimentales** | Pueden ser absorbidos por productos administrados, como AWS Agent Toolkit |
| **Carga directa de cientos de tools** | Tenderá a toolsets, búsqueda, progressive disclosure y code mode |
| **Configuraciones por cliente** | El roadmap busca portabilidad y gobierno central |
| **Flujos agente-a-agente** | Serán cubiertos por A2A u otras capas complementarias |

### 7.3 MCP, A2A, skills y OpenAPI

```text
OpenAPI / SDK     -> describe o implementa la API de negocio
MCP               -> expone datos y acciones al agente
Skill             -> enseña un procedimiento reutilizable
A2A               -> coordina agentes remotos entre sí
Agente / harness  -> planifica, decide, usa tools y verifica
```

Google presenta expresamente A2A como complemento de MCP: A2A conecta agentes,
mientras MCP les entrega herramientas y contexto [I5]. En 2026 existe además un
grupo de trabajo **Skills Over MCP**, señal de convergencia entre distribución
de procedimientos y descubrimiento de capacidades, no de sustitución inmediata
[I9].

### 7.4 Pronóstico

**Confianza alta, horizonte 1-3 años:** MCP persistirá como interfaz común de
agente a herramienta/dato.

**Confianza media:** se convertirá en una capa más pequeña y estable, rodeada de
extensiones, gateways, skills, identidad empresarial y protocolos agente-a-agente.

**Confianza baja:** la forma exacta de Tasks, Skills Over MCP, Server Cards y
primitivas futuras. El roadmap advierte expresamente que no es un compromiso.

---

## 8. Estado de las integraciones objetivo

### 8.1 Matriz

| Sistema | Oferta oficial a julio de 2026 | Estado y alcance | Recomendación |
| --- | --- | --- | --- |
| **Jira / Atlassian** | `atlassian/atlassian-mcp-server`, Rovo MCP remoto | GA; Jira, Confluence, JSM, Bitbucket y Compass; OAuth 2.1/API token; permission groups | Usar oficial para Atlassian Cloud |
| **GitHub** | `github/github-mcp-server` remoto y local | Servidor remoto administrado y contenedor local; repos, código, issues, PR, Actions y seguridad | Usar remoto; local para GHES o requisitos de aislamiento |
| **SonarQube** | `SonarSource/sonarqube-mcp-server` | Oficial; Cloud y Server; contenedor/JAR por `stdio`; quality gates, issues y análisis | Usar oficial, fijando versión e identidad de solo lectura |
| **AWS** | Agent Toolkit for AWS + AWS MCP Server administrado; `awslabs/mcp` sigue disponible | GA del servidor administrado en mayo de 2026; IAM, CloudWatch, CloudTrail y sandbox; AWS Labs queda como transición | Preferir Agent Toolkit para producción |
| **GCP** | Servidores remotos administrados de Google Cloud | Spec 2025-11-25; IAM, audit logs, toolsets y Model Armor; endpoints para Monitoring, Logging, Compute, GKE y otros | Preferir servidores remotos administrados |

Fuentes: [C1-C10].

### 8.2 Jira / Atlassian

El servidor oficial es un puente cloud-hosted. Las tools se agrupan por
intención (`read`, `write`, `search`) y las acciones respetan los permisos
existentes del usuario [C2].

**Limitación importante:** el producto oficial se orienta a Atlassian Cloud. Si
la organización usa Jira/Confluence Data Center, debe verificarse una opción
oficial compatible; no debe instalarse automáticamente un servidor comunitario
como sustituto sin revisión de seguridad.

**Toolset inicial recomendado:**

- buscar y leer issues;
- leer proyectos, tipos y metadatos;
- consultar transiciones;
- excluir inicialmente creación, edición, comentarios, worklogs y transiciones.

### 8.3 GitHub

El servidor oficial permite consultar repositorios, archivos, commits, issues,
PR, Actions y hallazgos de seguridad. El remoto usa
`https://api.githubcopilot.com/mcp/`; GitHub Enterprise Server requiere la
variante local [C1].

**Toolset inicial recomendado:**

- código, repositorios, issues y PR en lectura;
- workflows y alertas en lectura;
- permitir comentarios o creación de PR solo en una segunda fase;
- no habilitar administración, merge, release o cambios de secretos.

### 8.4 SonarQube

El servidor oficial conecta SonarQube Cloud y Server. SonarSource recomienda no
pasar tokens en argumentos de shell, usar variables de entorno y no guardar
secretos en control de versiones [C3].

**Uso inicial recomendado:**

- consultar quality gate;
- recuperar issues nuevos, bugs, vulnerabilidades y code smells;
- obtener métricas necesarias para verificar una PR;
- mantenerlo en solo lectura.

### 8.5 AWS

En mayo de 2026 AWS lanzó **Agent Toolkit for AWS** como sucesor de los
servidores, plugins y skills de AWS Labs. El producto incluye:

- servidor MCP administrado para servicios AWS;
- controles IAM que distinguen acciones de agentes;
- visibilidad en CloudWatch y CloudTrail;
- ejecución de código en sandbox;
- skills evaluadas y plugins de distribución [C4].

El repositorio `awslabs/mcp` continúa funcionando, pero AWS recomienda Agent
Toolkit para software de producción [C5].

### 8.6 GCP

Google ofrece servidores remotos administrados, compatibles con MCP 2025-11-25,
con IAM, audit logging, toolsets y Model Armor [C6].

Para el objetivo de monitoreo y estado:

- Cloud Monitoring: `https://monitoring.googleapis.com/mcp`;
- Cloud Logging: `https://logging.googleapis.com/mcp`;
- Compute Engine: `https://compute.googleapis.com/mcp`;
- GKE: `https://container.googleapis.com/mcp`, con toolsets separados de solo
  lectura y eliminación [C7-C10].

Para producción, debe crearse una identidad separada para el agente y otorgar
solo permisos de observación. Acciones como crear, detener, redimensionar o
eliminar recursos pertenecen a una fase posterior con aprobación.

---

## 9. Arquitectura recomendada para el SDLC

### 9.1 Flujo

```text
                         +----------------------+
                         | Agente de codificación|
                         | host / harness        |
                         +----------+-----------+
                                    |
                         policy, approvals, logs
                                    |
                  +-----------------+-----------------+
                  |        Gateway / control         |
                  | allowlists, scopes, rate limits, |
                  | redaction, audit, tool pinning   |
                  +----+-----------+----------+------+
                       |           |          |
              +--------+--+  +-----+----+ +---+---------+
              | Jira MCP  |  | GitHub MCP| | Sonar MCP  |
              +-----------+  +----------+ +-------------+
                       |
              +--------+------------------------------+
              | AWS Agent Toolkit o GCP remote MCPs  |
              +---------------------------------------+
```

El gateway puede ser una capacidad del host, un proxy empresarial o controles
del proveedor. No es obligatorio crear uno desde el primer día, pero sí debe
existir una capa que aplique políticas fuera del prompt.

### 9.2 Flujo de trabajo ejemplo

1. El agente lee el issue de Jira y sus criterios de aceptación.
2. Consulta el repositorio, PR relacionados y estado de CI en GitHub.
3. Implementa y ejecuta pruebas en el entorno local.
4. Consulta SonarQube para confirmar quality gate y nuevos hallazgos.
5. Consulta logs/métricas cloud para validar el síntoma o el despliegue.
6. Propone el cambio de Jira/PR; una persona aprueba las acciones de escritura.

### 9.3 Matriz de permisos

| Integración | Lectura automática | Escritura con aprobación | Prohibido inicialmente |
| --- | :---: | :---: | --- |
| Jira | Buscar/leer issues y metadatos | Crear/editar/comentar/transicionar | Borrado masivo, cambios de permisos |
| GitHub | Código, issues, PR, CI y alertas | Crear branch/PR/comentario | Merge, secrets, administración, release |
| SonarQube | Quality gates, métricas e issues | Normalmente ninguna | Cambios administrativos o de perfiles |
| AWS/GCP | Logs, métricas, inventario y estado | Reinicio o escalado no productivo | Borrado, IAM, red, secretos, producción |

### 9.4 No construir lo que el proveedor ya mantiene

Un servidor propio solo se justifica cuando:

- el proveedor no ofrece una integración oficial;
- se necesita una abstracción de dominio que combine varias APIs;
- existen reglas de autorización o residencia no cubiertas;
- se requiere transformar o minimizar datos antes de entregarlos al modelo;
- la medición demuestra un beneficio frente al servidor oficial.

Para Jira, GitHub, SonarQube y AWS/GCP, el punto de partida debe ser el servidor
oficial, no una reimplementación.

---

## 10. Cómo crear un servidor MCP

### 10.1 Proceso recomendado

1. **Definir el caso de uso.** Describir quién lo usará, qué decisión habilita y
   qué queda fuera de alcance.
2. **Revisar si ya existe un servidor oficial.** Evitar duplicar integraciones.
3. **Modelar capacidades.** Separar tools, resources y prompts.
4. **Diseñar identidad y permisos antes del código.**
5. **Elegir transporte.** `stdio` para local; Streamable HTTP para remoto.
6. **Usar un SDK oficial** de nivel soportado.
7. **Crear schemas estrictos** de entrada y salida.
8. **Implementar validación, idempotencia, paginación y límites.**
9. **Añadir auditoría, métricas, trazas y redacción de secretos.**
10. **Probar con MCP Inspector**, contract tests, casos adversariales y un host
    real [M6, M7].
11. **Empaquetar y fijar versión**, SBOM, firma e instrucciones de actualización.
12. **Publicar en el Registry** solo con ownership y proceso de soporte claros.

### 10.2 Selección de primitivas

```text
¿Solo entrega datos/contexto?
  -> Resource

¿Ejecuta una operación o tiene efecto externo?
  -> Tool

¿Es una plantilla explícita para el usuario?
  -> Prompt

¿Puede durar minutos, sobrevivir desconexiones o pedir aprobación?
  -> Task, si cliente y servidor soportan la extensión
```

### 10.3 Ejemplo mínimo conceptual en Python

```python
from mcp.server.fastmcp import FastMCP

mcp = FastMCP("sdlc-context")


@mcp.tool()
async def get_change_status(change_id: str) -> dict[str, object]:
    """Return the verified SDLC status for one change."""
    if not change_id or len(change_id) > 100:
        raise ValueError("change_id must contain 1-100 characters")

    return {
        "change_id": change_id,
        "jira": {"status": "In Progress"},
        "github": {"pull_request": 42, "ci": "success"},
        "sonarqube": {"quality_gate": "passed"},
    }


if __name__ == "__main__":
    mcp.run(transport="stdio")
```

El ejemplo solo ilustra la forma. Un servidor real debe autenticar cada backend,
propagar errores explícitos, aplicar timeouts y no inventar un estado exitoso
cuando una fuente falle.

### 10.4 Reglas de diseño de tools

- una responsabilidad por tool;
- nombres estables y descripciones literales, sin instrucciones ocultas;
- `additionalProperties: false` cuando sea posible;
- enums y formatos para limitar valores;
- salida estructurada y pequeña;
- paginación por cursor;
- límites máximos explícitos;
- `dry_run` para acciones riesgosas;
- idempotency key en escrituras;
- errores diferenciados: validación, autorización, rate limit, dependencia,
  timeout y conflicto;
- ninguna tool debe aceptar comandos de shell, SQL o URLs arbitrarias sin
  allowlist y validación específica.

---

## 11. Responsabilidades de quien crea u opera un servidor

Crear un servidor MCP equivale a publicar una API para un actor no determinista
con capacidad de combinarla con otras APIs. La responsabilidad es mayor que
“envolver un endpoint”.

| Área | Responsabilidad mínima |
| --- | --- |
| **Producto** | Definir usuario, alcance, propietario, SLA y criterio de retiro |
| **Contrato** | Schemas versionados, documentación, compatibilidad y deprecación |
| **Identidad** | Autenticar al cliente y preservar la identidad del usuario/agente |
| **Autorización** | Mínimo privilegio por tool, recurso, tenant y ambiente |
| **Datos** | Minimización, clasificación, residencia, retención y redacción |
| **Seguridad** | Threat model, sandbox, supply chain, prompt/tool injection y SSRF |
| **Confiabilidad** | Timeouts, retries seguros, circuit breaker, idempotencia y abortos |
| **Operación** | Logs, métricas, trazas, alertas, runbooks y respuesta a incidentes |
| **Calidad** | Contract tests, integración, regresión, adversarial testing y conformance |
| **Costos** | Tokens, latencia, llamadas al backend y límites de consumo |
| **Experiencia** | Descripciones claras, resultados compactos y errores accionables |
| **Gobierno** | Versiones fijadas, aprobación de cambios y evidencia de auditoría |

### Artefactos obligatorios

Cada servidor organizacional debería tener:

- `README` y catálogo de capabilities;
- threat model;
- matriz tool -> scope -> sistema -> efecto;
- owner técnico y owner de negocio;
- política de versiones y deprecación;
- suite de contract y security tests;
- SBOM y procedencia de artefactos;
- SLO de disponibilidad, latencia y error;
- runbook de revocación de credenciales;
- historial de cambios de schemas y descripciones;
- evaluación periódica de utilidad.

---

## 12. Seguridad y gobierno

### 12.1 Riesgos principales

- **Tool poisoning:** instrucciones maliciosas en nombres, descripciones,
  schemas o resultados.
- **Rug pull:** una tool cambia después de ser aprobada.
- **Prompt injection indirecta:** datos de Jira, PR, código o logs intentan
  controlar al agente.
- **Tool shadowing:** un servidor intenta modificar el uso de tools de otro.
- **Confused deputy:** el servidor actúa con más privilegios que el usuario.
- **Token passthrough:** aceptar o reenviar tokens que no fueron emitidos para
  el servidor.
- **Exfiltración:** datos sensibles salen por búsquedas, comentarios, issues o
  llamadas permitidas.
- **SSRF y command injection:** parámetros generados por el modelo alcanzan red,
  shell, SQL o filesystem.
- **Supply chain:** paquete, imagen o servidor comunitario comprometido.
- **Shadow MCP:** servidores instalados fuera del inventario corporativo.

MCPTox demuestra que el riesgo no es teórico: sobre 1.312 casos, la tasa máxima
de ataque superó 72 % y el rechazo máximo fue inferior a 3 % [A5].

### 12.2 Controles mínimos

1. Servidores oficiales y versiones fijadas.
2. Toolsets mínimos; nunca `*` por defecto en producción.
3. Credencial distinta por servidor, ambiente y agente.
4. Scopes de solo lectura como base.
5. Aprobación humana con parámetros completos para efectos sensibles.
6. Validación estricta de inputs y outputs.
7. Sanitización y clasificación de todo resultado antes de incorporarlo al
   contexto.
8. Sandbox para servidores locales y código generado.
9. TLS, OAuth/IAM y validación de audiencia en remoto.
10. Prohibición de token passthrough.
11. Rate limits, cuotas, timeouts, circuit breakers y límite de pasos.
12. Hash o revisión de definiciones de tools para detectar cambios.
13. Logging central, correlación por identidad y redacción de secretos.
14. Red teaming de prompt injection, tool poisoning y cross-server flows.
15. Kill switch para servidor, tool, identidad y sesión.

Las guías oficiales de MCP y OWASP recomiendan mínimo privilegio, aislamiento,
aprobación humana, validación, protección de identidad y monitoreo [S1, S2].

### 12.3 Política para acciones cloud

```text
Observación (logs, métricas, estado)
  -> automática con identidad read-only

Diagnóstico activo no destructivo
  -> aprobación por sesión

Cambio reversible en no-producción
  -> aprobación por llamada + dry run

Producción, IAM, secretos, red o eliminación
  -> fuera del agente o workflow externo con doble aprobación
```

### 12.4 El prompt no es una política

Una instrucción como “no borres recursos” no sustituye:

- negar la tool;
- negar el permiso IAM;
- exigir aprobación;
- ejecutar en sandbox;
- bloquear por policy engine;
- registrar y alertar.

Los controles deterministas deben vivir fuera del modelo.

---

## 13. Cómo medir la influencia en agentes de codificación

### 13.1 Preguntas que deben separarse

1. ¿Tener acceso a sistemas externos mejora el resultado?
2. ¿MCP es mejor que exponer esas mismas APIs mediante CLI o integración propia?
3. ¿El acceso de escritura agrega valor frente a solo lectura?
4. ¿El beneficio compensa tokens, latencia, revisión y riesgo?

### 13.2 Diseño experimental

| Brazo | Configuración | Qué permite medir |
| --- | --- | --- |
| **A — Sin integración** | Agente + repositorio, sin Jira/Sonar/cloud | Línea base del agente |
| **B — Integración no-MCP** | Mismas APIs mediante CLI o wrapper propio, mismos permisos | Valor del acceso sin atribuirlo a MCP |
| **C — MCP read-only** | Jira + GitHub + Sonar + cloud en lectura | Efecto incremental de estandarización/contexto MCP |
| **D — MCP con escritura acotada** | C + acciones aprobadas | Valor y riesgo de la autonomía externa |

Las comparaciones relevantes son:

- `A vs C`: valor total de acceso + MCP;
- `B vs C`: valor incremental atribuible a MCP;
- `C vs D`: valor incremental de la capacidad de actuar.

### 13.3 Tareas del piloto

Usar tareas reales ya resueltas o golden tasks:

- convertir un requerimiento Jira en plan técnico;
- localizar el código afectado y producir un parche;
- diagnosticar un CI fallido;
- corregir un quality gate;
- investigar una regresión mediante logs y métricas;
- preparar una PR y actualizar trazabilidad;
- ejecutar escenarios adversariales con contenido malicioso sembrado.

Estratificar por repositorio, fase SDLC, dificultad y riesgo. Fijar modelo,
harness, esfuerzo, instrucciones, límites y versiones.

### 13.4 KPIs

| Dimensión | Métricas |
| --- | --- |
| **Resultado** | pass@1 de CI, criterios de aceptación cumplidos, task success rate |
| **Calidad** | defectos escapados, hallazgos Sonar nuevos, quality gate, revisión humana ciega |
| **Tiempo** | tiempo total, tiempo humano activo, tiempo hasta PR y merge |
| **Herramientas** | tool selection accuracy, exactitud de parámetros, llamadas útiles/total, retries |
| **Confiabilidad** | error rate, timeout rate, tareas atascadas, recuperación y abortos |
| **Eficiencia** | tokens, costo por tarea aceptada, latencia p50/p95 por tool y flujo |
| **Autonomía** | pasos sin intervención, intervenciones humanas, reversión de acciones |
| **Seguridad** | intentos bloqueados, accesos fuera de alcance, secretos expuestos, attack success rate |
| **Entrega** | lead time, change failure rate y MTTR cuando exista volumen suficiente |
| **Experiencia** | satisfacción, confianza y carga de revisión; nunca como única evidencia |

### 13.5 Instrumentación

Registrar:

- task ID y brazo experimental;
- modelo, versión del host y configuración;
- servidor, versión, tool y hash del schema;
- identidad y scopes efectivos;
- timestamps, latencia, retries y códigos de error;
- tokens de entrada/salida sin guardar secretos;
- decisión de aprobación humana;
- resultado de CI, Sonar y revisión;
- acción revertida o incidente.

### 13.6 Tamaño y análisis

- Screening inicial: 10 tareas por caso de uso para fallos gruesos.
- Piloto: aspirar a al menos 30 tareas pareadas por estrato relevante.
- Repetir ejecuciones autónomas para medir varianza.
- Preregistrar métrica primaria y efecto mínimo útil.
- Reportar intervalos de confianza, mediana, p95 y distribución, no solo media.
- Usar modelos mixtos o diseño cruzado para controlar desarrollador,
  repositorio y dificultad.

El tamaño definitivo debe calcularse con la varianza observada; no existe un
número universal.

### 13.7 Scorecard de un servidor MCP

| Eje | Peso | Indicadores |
| --- | ---: | --- |
| Éxito de tarea | 25 % | pass rate y criterios cumplidos |
| Confiabilidad | 20 % | errores, timeouts, recuperación e idempotencia |
| Seguridad | 20 % | mínimo privilegio, attack success y trazabilidad |
| Eficiencia | 15 % | tokens, costo y latencia |
| Calidad de interfaz | 10 % | selección de tool y parámetros correctos |
| Operabilidad/portabilidad | 10 % | observabilidad, versiones y hosts compatibles |

**Gates, no compensables:** cero exposición de secretos; cero acciones
destructivas no aprobadas; auditoría completa; permisos efectivos dentro del
alcance. Un buen promedio no compensa una violación crítica.

---

## 14. Plan de adopción

### Fase 0 — Preparación

- inventario de hosts MCP aprobados;
- clasificación de datos y acciones;
- identidades separadas;
- baseline sin MCP;
- selección de tareas y KPIs;
- política de instalación y Registry.

### Fase 1 — Contexto de solo lectura

- Jira: búsqueda y lectura;
- GitHub: repos, issues, PR, CI y seguridad en lectura;
- SonarQube: quality gates, métricas e issues;
- AWS/GCP: logs, métricas, inventario y estado;
- aprobación desactivada porque no existen tools de escritura.

### Fase 2 — Escrituras reversibles

- comentar o crear issue;
- crear branch/PR;
- actualizar estado de una tarea;
- reiniciar o escalar solo en no-producción;
- aprobación por llamada y registro de parámetros.

### Fase 3 — Automatización controlada

- Tasks para CI, despliegues o aprobaciones largas;
- gateway empresarial;
- policy-as-code;
- evaluación continua;
- promoción o retiro de tools según beneficio medido.

### Criterios de promoción

Promover una integración cuando:

- mejora la métrica primaria frente a B, no solo frente a A;
- no reduce calidad ni seguridad;
- el costo por tarea aceptada es sostenible;
- p95 de latencia y error cumplen SLO;
- las acciones son auditables y reversibles.

Retirarla o rediseñarla cuando:

- no supera la integración no-MCP equivalente;
- aumenta retrabajo, tokens o revisión sin beneficio;
- requiere permisos excesivos;
- falla el red teaming;
- carece de owner o mantenimiento.

---

## 15. Recomendación final

MCP debe adoptarse como **infraestructura de integración para agentes**, no como
una promesa de autonomía.

Para este portafolio:

1. **Atlassian Rovo MCP**, **GitHub MCP Server** y **SonarQube MCP Server**
   oficiales.
2. En AWS, **Agent Toolkit for AWS**; en GCP, servidores remotos administrados
   de Monitoring, Logging, Compute y GKE.
3. Solo lectura por defecto, con toolsets mínimos e identidades separadas.
4. Escrituras en una fase posterior, con aprobación y exclusión inicial de
   producción, IAM, secretos, red, merge y borrado.
5. Evaluación A/B/C/D para separar el valor del acceso, el protocolo y la
   escritura.

La tesis más defendible a julio de 2026 es:

> **MCP aumenta la capacidad potencial y la portabilidad de los agentes, pero
> el beneficio real depende de la calidad del harness, del servidor y del
> gobierno. La adopción es suficientemente amplia para tratarlo como estándar
> durable; la evidencia de productividad causal todavía debe producirse dentro
> de cada organización.**

---

## 16. Limitaciones y revalidación

1. No existe un RCT público que aísle MCP frente a una integración no-MCP
   funcionalmente equivalente.
2. La mayoría de benchmarks MCP son preprints de 2025 y pueden cambiar.
3. Las cifras de adopción son de proveedores y no están auditadas.
4. Los servidores y toolsets cambian con rapidez.
5. La última especificación estable verificada es 2025-11-25, pero existen SEPs
   finales y borradores de 2026 todavía no reflejados en una nueva revisión
   estable.
6. Los clientes no soportan todas las extensiones de la misma forma.
7. El resultado no se generaliza entre repositorios, equipos o tareas.

**Revalidación recomendada:** trimestral; además, cuando cambie la especificación,
el servidor, el host, los scopes, el modelo o la política de seguridad.

---

## 17. Referencias

### 17.1 Especificación, arquitectura y gobierno

- **[M1]** MCP, [Architecture overview](https://modelcontextprotocol.io/docs/learn/architecture.md).
- **[M2]** MCP Specification 2025-11-25,
  [Transports](https://modelcontextprotocol.io/specification/2025-11-25/basic/transports).
- **[M3]** MCP Specification 2025-11-25,
  [Changelog](https://modelcontextprotocol.io/specification/2025-11-25/changelog).
- **[M4]** MCP,
  [Understanding MCP servers](https://modelcontextprotocol.io/docs/learn/server-concepts.md).
- **[M5]** MCP Specification 2025-11-25,
  [Authorization](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization).
- **[M6]** MCP,
  [Build an MCP server](https://modelcontextprotocol.io/docs/develop/build-server.md).
- **[M7]** MCP,
  [MCP Inspector](https://modelcontextprotocol.io/docs/tools/inspector.md).

### 17.2 Industria, gobernanza y figuras de autoridad

- **[I1]** Anthropic, 25-nov-2024,
  [Introducing the Model Context Protocol](https://www.anthropic.com/news/model-context-protocol).
- **[I2]** Anthropic, 9-dic-2025,
  [Donating MCP and establishing the Agentic AI Foundation](https://www.anthropic.com/news/donating-the-model-context-protocol-and-establishing-of-the-agentic-ai-foundation).
- **[I3]** MCP, 31-jul-2025,
  [Governance for MCP](https://blog.modelcontextprotocol.io/posts/2025-07-31-governance-for-mcp/).
- **[I4]** MCP, 25-nov-2025,
  [The first MCP anniversary](https://blog.modelcontextprotocol.io/posts/2025-11-25-first-mcp-anniversary/).
- **[I5]** Google, 2025,
  [A2A: A new era of agent interoperability](https://developers.googleblog.com/en/a2a-a-new-era-of-agent-interoperability/).
- **[I6]** MCP, actualizado 5-mar-2026,
  [Roadmap](https://modelcontextprotocol.io/development/roadmap.md).
- **[I7]** MCP, SEP final creado 14-abr-2026,
  [SEP-2577: Deprecate Roots, Sampling, and Logging](https://modelcontextprotocol.io/seps/2577-deprecate-roots-sampling-and-logging.md).
- **[I8]** Anthropic Engineering,
  [Code execution with MCP: building more efficient AI agents](https://www.anthropic.com/engineering/code-execution-with-mcp).
- **[I9]** MCP,
  [Skills Over MCP Working Group](https://modelcontextprotocol.io/community/working-groups/skills-over-mcp.md).
- MCP,
  [Feature Lifecycle and Deprecation Policy](https://modelcontextprotocol.io/community/feature-lifecycle.md).
- MCP,
  [Design Principles](https://modelcontextprotocol.io/community/design-principles.md).
- MCP,
  [Tasks extension](https://modelcontextprotocol.io/extensions/tasks/overview.md).

**Figuras de autoridad citadas en las fuentes oficiales:**

- **David Soria Parra** y **Justin Spahr-Summers**, creadores de MCP [I1].
- **Srinivas Narayanan**, CTO B2B Applications de OpenAI: MCP es una parte clave
  de cómo OpenAI construye sus productos [I4].
- **Mario Rodriguez**, CPO de GitHub: describe el paso de experimento a estándar
  industrial en un año [I4].
- **Asha Sharma**, President CoreAI de Microsoft: destaca el patrón “write once,
  integrate everywhere” [I4].
- **Swami Sivasubramanian**, VP Agentic AI de AWS: confirma adopción de MCP en
  productos AWS [I4].
- **Anna Berenberg**, Engineering Fellow de Google Cloud: confirma soporte en
  Gemini y servidores Google [I4].

### 17.3 Academia y benchmarks

- **[A1]** Luo et al., Salesforce AI Research,
  [MCP-Universe: Benchmarking Large Language Models with Real-World Model Context Protocol Servers](https://arxiv.org/abs/2508.14704),
  arXiv:2508.14704.
- **[A2]** Wang et al., Accenture,
  [MCP-Bench: Benchmarking Tool-Using LLM Agents with Complex Real-World Tasks via MCP Servers](https://arxiv.org/abs/2508.20453),
  arXiv:2508.20453.
- **[A3]** Fan et al., Ant Group,
  [MCPToolBench++](https://arxiv.org/abs/2508.07575),
  arXiv:2508.07575.
- **[A4]**
  [MCP-RADAR: A Multi-Dimensional Benchmark for Evaluating Tool Use Capabilities in Large Language Models](https://arxiv.org/abs/2505.16700),
  arXiv:2505.16700.
- **[A5]**
  [MCPTox: A Benchmark for Tool Poisoning Attack on Real-World MCP Servers](https://arxiv.org/abs/2508.14925),
  arXiv:2508.14925.
- **[A6]**
  [Network and Systems Performance Characterization of MCP-Enabled LLM Agents](https://arxiv.org/abs/2511.07426),
  arXiv:2511.07426.
- Hou et al.,
  [Model Context Protocol: Landscape, Security Threats, and Future Research Directions](https://arxiv.org/abs/2503.23278),
  arXiv:2503.23278.
- Radosevich y Halloran,
  [MCP Safety Audit](https://arxiv.org/abs/2504.03767),
  arXiv:2504.03767.
- **[A7]** Princeton/SWE-bench,
  [SWE-bench](https://www.swebench.com/).
- **[A8]** METR,
  [Measuring the Impact of Early-2025 AI on Experienced Open-Source Developer Productivity](https://arxiv.org/abs/2507.09089).
- **[A9]** METR, 24-feb-2026,
  [Updated productivity results](https://metr.org/blog/2026-02-24-uplift-update/).
- Google Cloud DORA,
  [State of AI-assisted Software Development 2025](https://dora.dev/research/2025/dora-report/).

### 17.4 Servidores e integraciones oficiales

- **[C1]** GitHub,
  [GitHub MCP Server](https://github.com/github/github-mcp-server).
- **[C2]** Atlassian,
  [Atlassian Rovo MCP Server](https://github.com/atlassian/atlassian-mcp-server).
- **[C3]** SonarSource,
  [SonarQube MCP Server](https://github.com/SonarSource/sonarqube-mcp-server).
- **[C4]** AWS, mayo de 2026,
  [Agent Toolkit for AWS](https://aws.amazon.com/about-aws/whats-new/2026/05/agent-toolkit/).
- **[C5]** AWS Labs,
  [Open source MCP servers for AWS](https://github.com/awslabs/mcp).
- **[C6]** Google Cloud,
  [Google Cloud MCP servers overview](https://docs.cloud.google.com/mcp/overview).
- **[C7]** Google Cloud,
  [Cloud Monitoring MCP](https://docs.cloud.google.com/monitoring/api/ref_v3_mcp/mcp).
- **[C8]** Google Cloud,
  [Cloud Logging MCP](https://docs.cloud.google.com/logging/docs/use-logging-mcp).
- **[C9]** Google Cloud,
  [Compute Engine MCP](https://docs.cloud.google.com/compute/docs/reference/mcp).
- **[C10]** Google Cloud,
  [Google Kubernetes Engine MCP](https://docs.cloud.google.com/kubernetes-engine/docs/reference/mcp).
- Google Cloud, 10-dic-2025,
  [Announcing official MCP support for Google services](https://cloud.google.com/blog/products/ai-machine-learning/announcing-official-mcp-support-for-google-services).
- Google,
  [MCP Toolbox for Databases](https://github.com/googleapis/mcp-toolbox).

### 17.5 Seguridad

- **[S1]** MCP,
  [Security Best Practices](https://modelcontextprotocol.io/docs/tutorials/security/security_best_practices.md).
- **[S2]** OWASP,
  [MCP Security Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/MCP_Security_Cheat_Sheet.html).
- OWASP,
  [MCP Top 10](https://owasp.org/www-project-mcp-top-10/).
