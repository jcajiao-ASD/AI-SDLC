---
id: configuracion-openspec-yaml
title: "Configuración empresarial de OpenSpec mediante openspec/config.yaml"
slug: configuracion-openspec-yaml
summary: "Explica los campos, precedencia, impacto y límites de openspec/config.yaml, con una configuración recomendada para desarrollo seguro."
category: metodologias
status: vigente
cutoffDate: "2026-07-22"
revalidateAfter: "2027-01-22"
evidenceLevel: mixta
decisionType: configuracion-framework
role: catalog
---

# Configuración empresarial de OpenSpec mediante `openspec/config.yaml`

[<- volver al índice](_index.md)

> **Estado:** vigente. Corte temporal: **22 de julio de 2026**.  
> **Versión verificada:** `@fission-ai/openspec` **1.6.0**, publicada el
> 10 de julio de 2026. La rama `main` se verificó en el commit
> `11a301d5fbddf6e5628e82b4feb5807538884dbc` [O1, O2].
>
> **Conclusión de evidencia:** la explicación de `schema`, `context` y `rules`
> está respaldada por la documentación oficial y por el código que construye
> las instrucciones. Los campos avanzados `references` y `store`, así como el
> parseo resiliente y el límite de 50 KB, se verificaron en la implementación
> actual. Las recomendaciones de gobierno y seguridad son una inferencia
> organizacional: OpenSpec las puede presentar al agente, pero no imponerlas.

---

## Respuesta ejecutiva

Sí existe una oportunidad real de adaptar OpenSpec a los lineamientos de una
empresa. `openspec/config.yaml` permite definir:

- el workflow predeterminado mediante `schema`;
- el contexto organizacional que recibirá la IA mediante `context`;
- reglas específicas para cada artefacto mediante `rules`;
- referencias de solo lectura a specs de otros repositorios mediante
  `references`;
- un store de planificación predeterminado en repositorios que funcionan como
  punteros mediante `store`.

Su impacto principal es sobre las **instrucciones que OpenSpec entrega al
agente**. El orden efectivo es:

```text
contexto del proyecto
→ reglas del artefacto
→ instrucción y plantilla del schema
→ artefacto generado por la IA
```

Esto mejora la probabilidad de que propuestas, specs, diseños y tareas respeten
las convenciones de la organización. Sin embargo, no convierte esas
convenciones en controles obligatorios: `context` y `rules` son prompt
injection deliberada, no políticas ejecutables. `openspec validate` tampoco
comprueba que la IA haya cumplido cada regla corporativa.

Para desarrollo seguro, la configuración debe usarse como **capa preventiva de
planificación**, acompañada por controles externos: protección de ramas,
CODEOWNERS, revisión humana, SAST, SCA, secret scanning, pruebas, políticas de
CI y validaciones específicas sobre los artefactos.

## Índice

1. [Qué se configura](#1-qué-se-configura)
2. [Dónde se ubica y cómo se crea](#2-dónde-se-ubica-y-cómo-se-crea)
3. [Campos del YAML](#3-campos-del-yaml)
4. [Precedencia y alcance](#4-precedencia-y-alcance)
5. [Impacto sobre OpenSpec y el agente](#5-impacto-sobre-openspec-y-el-agente)
6. [Configuración empresarial recomendada](#6-configuración-empresarial-recomendada)
7. [Cómo diseñar reglas eficaces](#7-cómo-diseñar-reglas-eficaces)
8. [Validación y operación](#8-validación-y-operación)
9. [Riesgos y límites](#9-riesgos-y-límites)
10. [Modelo de gobierno recomendado](#10-modelo-de-gobierno-recomendado)
11. [Decisión](#11-decisión)
12. [Limitaciones y revalidación](#12-limitaciones-y-revalidación)
13. [Referencias](#13-referencias)

## 1. Qué se configura

La guía oficial distingue tres niveles [O2]:

| Nivel | Mecanismo | Cuándo usarlo |
| --- | --- | --- |
| Configuración de proyecto | `openspec/config.yaml` | La mayoría de equipos: defaults, contexto y reglas. |
| Schema personalizado | `openspec/schemas/<nombre>/schema.yaml` y templates | Cuando se deben cambiar artefactos, dependencias o el workflow. |
| Overrides globales | Schemas del usuario | Para reutilización local entre proyectos; menos trazables que un schema versionado en el repositorio. |

La distinción es importante:

- `config.yaml` **personaliza instrucciones y selecciona un schema**;
- `schema.yaml` **define el grafo del workflow**, sus artefactos, dependencias,
  templates e instrucciones base.

Si la empresa solo necesita expresar tecnologías, políticas, formatos y
comprobaciones esperadas, `config.yaml` es suficiente. Si necesita un artefacto
obligatorio adicional —por ejemplo, `security-review.md` antes de `tasks.md`—,
debe crear un schema personalizado. La documentación oficial muestra
precisamente el patrón de añadir un artefacto de revisión que incluya
consideraciones de seguridad, rendimiento y pruebas [O2].

## 2. Dónde se ubica y cómo se crea

La ruta normal es:

```text
<raíz-del-repositorio>/openspec/config.yaml
```

La implementación acepta también `openspec/config.yml`, pero busca primero
`config.yaml`; si ambos existen, prevalece el archivo `.yaml` [O3].

La creación inicial se realiza con:

```bash
openspec init
```

En 1.6.0, `init` crea la base con:

```yaml
schema: spec-driven
```

y añade ejemplos comentados para `context` y `rules`. El contenido corporativo
debe redactarse manualmente; el comando no descubre ni convierte por sí mismo
las políticas de seguridad de la empresa [O4].

OpenSpec migró desde el antiguo `openspec/project.md` porque ese archivo era
pasivo: el agente podía leerlo o ignorarlo. El nuevo `context` se incluye
activamente en las solicitudes de planificación. La guía de migración aconseja
mantenerlo conciso y trasladar solo tecnologías, restricciones no obvias y
reglas que antes se incumplían con frecuencia [O5].

## 3. Campos del YAML

### 3.1 Resumen

| Campo | Tipo | Uso | Impacto |
| --- | --- | --- | --- |
| `schema` | string no vacío | Schema predeterminado | Selecciona artefactos, dependencias, templates e instrucciones base. |
| `context` | string | Contexto transversal | Se entrega en todos los artefactos. Límite: 50 KB UTF-8. |
| `rules` | mapa de listas de strings | Reglas por ID de artefacto | Solo se entregan al artefacto coincidente. |
| `references` | lista de IDs o mapas `{id, remote}` | Specs externas de solo lectura | Añade un índice de specs de stores registrados. |
| `store` | string | Store raíz predeterminado | Solo actúa como fallback en un directorio OpenSpec sin forma de planificación local. |

La documentación de personalización presenta directamente los tres primeros.
Los dos últimos son capacidades avanzadas presentes en el código y en la
referencia CLI actual [O3, O6].

### 3.2 `schema`

Ejemplo:

```yaml
schema: spec-driven
```

Es el nombre del workflow usado por defecto. `spec-driven` contiene los
artefactos habituales:

```text
proposal → specs y design → tasks → apply
```

Cambiar el valor puede modificar:

- qué artefactos existen;
- en qué orden se habilitan;
- qué archivos se generan;
- qué templates recibe la IA;
- qué artefactos deben estar completos antes de aplicar.

Un schema personalizado se selecciona así:

```yaml
schema: secure-sdlc
```

pero debe existir en una ubicación resoluble, normalmente:

```text
openspec/schemas/secure-sdlc/
├── schema.yaml
└── templates/
```

Aunque el modelo de configuración declara `schema` como requerido, el parser es
resiliente: si falta o es inválido, puede continuar con una configuración
parcial y el sistema terminar usando el default `spec-driven`. Para gobierno
empresarial no conviene depender de ese fallback.

### 3.3 `context`

Ejemplo:

```yaml
context: |
  Stack: Java 21, Spring Boot 3, PostgreSQL.
  Arquitectura: servicios hexagonales y APIs contract-first.
  Clasificación de datos: Internal por defecto; Restricted para PII.
  Los cambios deben preservar compatibilidad de APIs públicas.
```

`context` es un bloque de texto libre que se entrega a **todos** los artefactos.
Debe contener hechos estables y transversales:

- stack y versiones relevantes;
- arquitectura;
- convenciones de API y persistencia;
- restricciones regulatorias;
- clasificación de datos;
- compatibilidad;
- prácticas de pruebas;
- decisiones organizacionales que afectan casi cualquier cambio.

La implementación limita el contexto a **50 × 1024 bytes**. Si lo supera, no lo
trunca: emite warnings e ignora el campo completo [O3].

Esto desaconseja copiar políticas extensas. También debe evitarse incluir
secretos, tokens, credenciales, datos personales o información que no deba
entrar al contexto del agente.

Mencionar una ruta como `docs/security-policy.md` no equivale a incluir ese
archivo. `context` es texto inline; OpenSpec no implementa
`context: ./archivo.md`. Se deben resumir dentro del YAML las reglas críticas y
usar la ruta solo como trazabilidad adicional [O5].

### 3.4 `rules`

Ejemplo:

```yaml
rules:
  proposal:
    - Clasificar los datos afectados y señalar requisitos regulatorios.
    - Incluir riesgos, dependencias, equipos afectados y rollback.
  specs:
    - Incluir escenarios positivos, negativos y de autorización.
    - Expresar comportamiento observable; no sustituirlo por detalles internos.
  design:
    - Documentar trust boundaries, amenazas y mitigaciones.
    - Justificar nuevas dependencias y cambios criptográficos.
  tasks:
    - Incluir pruebas y verificaciones de seguridad aplicables.
    - Separar tareas implementables y verificables.
```

Las claves deben coincidir con IDs de artefacto del schema, no necesariamente
con nombres de archivo. En `spec-driven`, los IDs relevantes son `proposal`,
`specs`, `design` y `tasks`.

Las reglas son aditivas: no reemplazan la instrucción ni el template del schema.
OpenSpec conserva el texto y lo entrega al artefacto correspondiente [O3, O7].

Un typo como `desing:` no bloquea la generación. La implementación puede
advertir que el ID es desconocido, pero continúa. Por ello, una organización
debe revisar los warnings y comprobar las instrucciones ensambladas.

### 3.5 `references`

Ejemplo:

```yaml
references:
  - platform-standards
  - id: security-baseline
    remote: https://github.example.com/architecture/security-baseline.git
```

Este campo declara stores externos registrados en la máquina. OpenSpec añade a
las instrucciones un índice de sus specs: ID, resumen del propósito y comando
para consultar el contenido. No copia el contenido completo ni cambia el lugar
donde se escribe el trabajo [O6].

Uso empresarial posible:

- catálogo central de estándares de arquitectura;
- contratos compartidos entre plataformas;
- baseline de seguridad;
- taxonomía corporativa de capacidades.

Límites:

- el store debe estar registrado y disponible localmente;
- `remote` sirve para orientar el onboarding, no sincroniza el repositorio;
- la referencia es de solo lectura;
- una referencia no resuelta degrada a warning;
- el acceso y la actualización del repositorio externo siguen siendo
  responsabilidades organizacionales.

### 3.6 `store`

Ejemplo:

```yaml
store: enterprise-planning
```

`store` permite que un directorio `openspec/` que solo contiene configuración
actúe como puntero hacia otro store. Es un fallback, no un override: si existen
`openspec/specs/` o `openspec/changes/` locales, la forma de planificación local
prevalece; un `--store` explícito también tiene prioridad [O3, O6].

No debe incorporarse por defecto en todos los repositorios. Es una capacidad
especializada para planificación centralizada y puede cambiar dónde termina el
trabajo si se usa sin comprender la resolución de raíces.

## 4. Precedencia y alcance

### 4.1 Resolución del schema

OpenSpec resuelve el schema en este orden [O2, O8]:

1. `--schema <nombre>` indicado en el comando;
2. `schema` de `.openspec.yaml` dentro del change;
3. `schema` de `openspec/config.yaml`;
4. default `spec-driven`.

Consecuencias:

- `config.yaml` fija el comportamiento normal del repositorio;
- un change existente puede mantener otro schema mediante su metadata;
- un comando explícito puede sobrescribir ambos;
- cambiar el default no migra automáticamente los changes ya asociados a otro
  schema.

### 4.2 Alcance de proyecto

`openspec/config.yaml` pertenece al repositorio y debe versionarse con él. No es
el mismo sistema que:

```bash
openspec config path
openspec config list
openspec config set ...
```

Esos comandos administran configuración global de la máquina, como telemetría,
perfil o delivery. No editan el YAML de proyecto descrito aquí [O6].

### 4.3 Resolución de schemas

Un schema se busca, en términos generales, en:

1. `openspec/schemas/<nombre>/` del proyecto;
2. directorio de datos del usuario;
3. schemas incluidos en el paquete.

El schema de proyecto es preferible para una empresa porque queda versionado,
revisable y reproducible. Un override de usuario puede introducir diferencias
entre estaciones de trabajo.

## 5. Impacto sobre OpenSpec y el agente

### 5.1 Construcción de instrucciones

La documentación representa la inyección como:

```xml
<context>
...
</context>

<rules>
...
</rules>

<template>
...
</template>
```

El código devuelve `context`, `rules` y `template` como campos separados de las
instrucciones enriquecidas. El consumidor los presenta al agente junto con la
instrucción del artefacto, las dependencias y las rutas resueltas [O7].

Por tanto:

| Configuración | Efecto directo |
| --- | --- |
| Cambiar `schema` | Cambia el workflow y la guía base. |
| Cambiar `context` | Cambia el trasfondo disponible en toda planificación. |
| Cambiar `rules.proposal` | Cambia solo la guía de propuestas. |
| Cambiar `rules.tasks` | Cambia la descomposición del trabajo, no el código automáticamente. |
| Añadir `references` | Añade visibilidad sobre specs externas. |
| Cambiar `store` | Puede cambiar la raíz de planificación usada como fallback. |

### 5.2 Qué superficies consumen la configuración

La configuración se refleja en las instrucciones usadas para crear artefactos y
para aplicar tareas. La superficie más útil para inspeccionarla es:

```bash
openspec instructions design --change "<change>" --json
openspec instructions apply --change "<change>" --json
```

El JSON permite comprobar qué `schemaName`, `context`, `rules`, `template`,
dependencias y rutas recibirá el agente [O6].

### 5.3 Qué no cambia

El YAML no:

- modifica pesos ni comportamiento interno del LLM;
- garantiza obediencia del agente;
- concede permisos o crea un sandbox;
- ejecuta SAST, SCA, DAST, secret scanning ni pruebas;
- protege ramas o exige aprobación;
- valida semánticamente que los artefactos cumplan cada regla;
- convierte una referencia a una política en contenido cargado;
- sustituye un schema personalizado cuando se requiere cambiar el workflow.

## 6. Configuración empresarial recomendada

La siguiente plantilla usa el schema estándar y fortalece sus cuatro artefactos.
Es una recomendación propia basada en el mecanismo oficial; no es una plantilla
publicada por Fission-AI.

El propio repositorio de OpenSpec aplica este patrón: coloca stack y requisitos
multiplataforma en `context`, y añade a `specs`, `design` y `tasks` reglas
específicas para rutas de Windows, APIs de `path` y verificación en CI [O10].
Eso constituye evidencia de uso real para lineamientos transversales, aunque no
demuestra enforcement.

```yaml
schema: spec-driven

context: |
  Organización:
  - El repositorio sigue el Secure SDLC corporativo.
  - La evidencia debe distinguir requisitos, diseño, implementación y verificación.
  - No incluir secretos, credenciales, tokens ni datos personales en artefactos.

  Arquitectura:
  - Reutilizar patrones y componentes aprobados antes de introducir alternativas.
  - Mantener compatibilidad hacia atrás en APIs y eventos públicos.
  - Documentar decisiones que afecten trust boundaries o flujos de datos.

  Seguridad:
  - Aplicar mínimo privilegio, deny-by-default y validación de entrada.
  - Usar los mecanismos corporativos de identidad, cifrado y gestión de secretos.
  - Tratar dependencias, imágenes y acciones de CI como riesgo de supply chain.
  - La clasificación de datos determina logging, retención y controles de acceso.

  Calidad:
  - Todo cambio debe definir comportamiento observable y criterios verificables.
  - Los controles obligatorios se ejecutan en CI; OpenSpec no los reemplaza.

rules:
  proposal:
    - Identificar activos, datos, actores, equipos y sistemas afectados.
    - Incluir impacto de seguridad, privacidad, compatibilidad y operación.
    - Incluir estrategia de despliegue, rollback y observabilidad.
    - Declarar non-goals y supuestos que requieran validación.

  specs:
    - Expresar requisitos normativos y escenarios Given/When/Then.
    - Incluir casos positivos, negativos, límites y estados de error.
    - Incluir escenarios de autenticación y autorización cuando apliquen.
    - Especificar comportamiento de auditoría sin registrar secretos ni PII.
    - Definir criterios de aceptación observables, no solo detalles internos.

  design:
    - Delimitar trust boundaries, entradas no confiables y flujos de datos.
    - Analizar amenazas y documentar mitigaciones para riesgos relevantes.
    - Justificar nuevas dependencias, permisos, criptografía y conexiones externas.
    - Definir manejo de errores, degradación, rollback y migración.
    - Explicar cómo se verificarán requisitos de seguridad y privacidad.

  tasks:
    - Crear tareas separadas para implementación y verificación.
    - Incluir pruebas unitarias, integración y abuso según el riesgo.
    - Incluir SAST, SCA, secret scanning y actualización de SBOM cuando apliquen.
    - Incluir revisión de permisos, logging, datos sensibles y configuración.
    - No marcar una tarea completa sin evidencia reproducible.
```

### 6.1 Por qué esta distribución

| Ubicación | Contenido adecuado | Razón |
| --- | --- | --- |
| `context` | Hechos y principios transversales | Aparece siempre; debe ser estable y compacto. |
| `proposal` | Impacto, alcance, riesgo y rollback | Decide si el cambio debe realizarse. |
| `specs` | Comportamiento observable y casos adversos | Define qué debe cumplirse. |
| `design` | Amenazas, arquitectura y mitigaciones | Explica cómo se reducirá el riesgo. |
| `tasks` | Acciones y evidencia | Convierte decisiones en trabajo verificable. |

### 6.2 Variante con estándares compartidos

Si la empresa mantiene specs centrales:

```yaml
schema: spec-driven

references:
  - id: enterprise-security
    remote: ssh://git@github.example.com/platform/enterprise-security.git
  - platform-contracts

context: |
  Consultar las specs corporativas referenciadas antes de proponer excepciones.
  Toda excepción debe quedar explícita, justificada y aprobable.
```

Esto mejora descubribilidad, pero no obliga a leer todas las specs ni verifica
su cumplimiento. Las reglas críticas deben seguir resumidas en `context` o
`rules`, y los controles deben seguir implementados fuera del prompt.

## 7. Cómo diseñar reglas eficaces

### 7.1 Escribir resultados verificables

Débil:

```yaml
- Consider security.
```

Mejor:

```yaml
- Identificar entradas no confiables, amenazas relevantes, mitigaciones y pruebas.
```

La segunda regla produce elementos observables y revisables.

### 7.2 Usar la regla en el artefacto correcto

Débil:

```yaml
rules:
  tasks:
    - El sistema debe devolver 403 cuando el rol no tenga permiso.
```

Mejor:

```yaml
rules:
  specs:
    - Incluir un escenario que espere 403 para un actor autenticado sin permiso.
  tasks:
    - Implementar y probar los escenarios negativos de autorización de la spec.
```

La obligación de comportamiento pertenece a la spec; la acción ejecutable
pertenece a las tareas.

### 7.3 Evitar instrucciones contradictorias

El agente recibe contexto, reglas, instrucción y template. Una regla corporativa
que contradice el schema crea ambigüedad. Si la contradicción es estructural,
debe cambiarse el schema o el template en lugar de acumular excepciones en
`rules`.

### 7.4 Mantener el contexto pequeño

Una configuración extensa:

- consume contexto en cada generación;
- repite información irrelevante;
- aumenta la probabilidad de contradicciones;
- puede superar 50 KB y quedar completamente ignorada.

Debe priorizarse lo estable, frecuente y de alto impacto. La política completa
puede vivir en documentación corporativa; el YAML debe contener su resumen
operativo.

### 7.5 No incluir secretos

El archivo se versiona y se entrega al agente. No debe contener:

- claves;
- tokens;
- contraseñas;
- endpoints internos sensibles innecesarios;
- datos reales de clientes;
- excepciones de seguridad no destinadas al repositorio.

## 8. Validación y operación

### 8.1 Inspección recomendada

Después de editar el YAML:

```bash
openspec list --json
openspec status --change "<change>" --json
openspec instructions proposal --change "<change>" --json
openspec instructions specs --change "<change>" --json
openspec instructions design --change "<change>" --json
openspec instructions tasks --change "<change>" --json
```

Debe comprobarse:

- schema resuelto;
- presencia y tamaño razonable de `context`;
- reglas correctas en cada artefacto;
- ausencia de reglas en artefactos no correspondientes;
- referencias resueltas;
- rutas de salida esperadas.

Para schemas personalizados:

```bash
openspec schema validate "<schema>"
openspec schema which "<schema>"
openspec schema which --all
```

Para artefactos:

```bash
openspec validate --all --strict
```

`schema validate` valida `schema.yaml`, no `openspec/config.yaml`. Tampoco existe
en 1.6.0 un comando dedicado `openspec config validate` para la configuración de
proyecto. El subcomando `openspec config` corresponde a la configuración global
de la máquina [O6].

### 8.2 Parseo resiliente

OpenSpec intenta continuar cuando encuentra errores de configuración [O3]:

- campo inválido: warning y descarte del campo;
- regla vacía: warning y descarte;
- reglas mal tipadas: warning y descarte por artefacto;
- `context` mayor de 50 KB: warning y descarte completo;
- YAML no parseable: warning e ignorar configuración;
- ID de artefacto desconocido: warning, no bloqueo.

Este diseño favorece compatibilidad y disponibilidad, pero es débil para una
organización que espera comportamiento fail-closed.

Por ello, CI debe tratar warnings o cambios inesperados en las instrucciones
como fallos de política. Una comprobación empresarial puede:

1. parsear el YAML con una herramienta aprobada;
2. exigir `schema` permitido;
3. limitar claves a una allowlist;
4. validar que cada ID de `rules` exista en los schemas autorizados;
5. impedir secretos y URLs no permitidas;
6. comparar `openspec instructions ... --json` con expectativas;
7. exigir revisión de CODEOWNERS para `openspec/config.yaml` y
   `openspec/schemas/**`.

## 9. Riesgos y límites

### 9.1 Las reglas son instrucciones, no enforcement

El riesgo principal es confundir una recomendación al modelo con un control
obligatorio. La IA puede:

- omitir una regla;
- interpretarla de forma incompleta;
- producir un artefacto aparentemente correcto pero no verificable;
- recibir instrucciones contradictorias desde otra capa.

La conformidad debe medirse sobre artefactos, código, pruebas y pipeline.

### 9.2 Prompt injection desde el repositorio

El texto de `context` y `rules` se conserva como instrucción. Una modificación
maliciosa o accidental puede intentar redirigir el comportamiento del agente.
OpenSpec reconoce como superficie de seguridad la inyección alcanzable desde
archivos de configuración o specs, aunque su threat model no documenta una
mitigación específica para prompt injection de LLM [O9].

Mitigaciones:

- proteger el archivo con CODEOWNERS;
- exigir revisión de seguridad para cambios de contexto, rules o schemas;
- no confiar automáticamente en schemas comunitarios;
- revisar diffs de instrucciones y templates;
- ejecutar agentes con mínimo privilegio;
- mantener gates independientes.

### 9.3 Fallos abiertos

Un typo puede desactivar una regla sin detener el flujo. Para seguridad, los
warnings no deben considerarse informativos: deben capturarse y convertirse en
errores de CI.

### 9.4 Drift organizacional

Una política puede cambiar mientras el YAML permanece antiguo. Conviene asignar:

- propietario;
- fecha de revisión;
- versión o referencia de la política;
- proceso de actualización;
- pruebas de conformidad.

No existe un campo de versión propio del formato de `config.yaml`; el control de
versiones depende de Git y de la disciplina del repositorio.

### 9.5 Schemas de terceros

Los schemas comunitarios se copian al proyecto y contienen instrucciones y
templates que entran al prompt. Antes de adoptarlos se debe:

- fijar una revisión o release;
- auditar `schema.yaml`, templates e instrucciones;
- verificar licencia y procedencia;
- revisar actualizaciones como cambios de supply chain;
- evitar instalación automática desde ramas mutables.

## 10. Modelo de gobierno recomendado

| Capa | Control | Responsable |
| --- | --- | --- |
| Repositorio | `config.yaml` versionado y CODEOWNERS | Arquitectura y AppSec |
| OpenSpec | Contexto y rules por artefacto | Equipo de producto/ingeniería |
| Schema | Artefactos y dependencias obligatorias | Plataforma/SDLC |
| Pull request | Revisión humana y trazabilidad | Maintainers |
| CI | Tests, SAST, SCA, secretos, políticas | Plataforma/AppSec |
| Entrega | Aprobaciones, firma y despliegue | DevOps/SRE |
| Auditoría | Evidencia y métricas de incumplimiento | Riesgo/compliance |

### 10.1 Cuándo basta `config.yaml`

Es suficiente cuando la empresa necesita:

- contexto tecnológico;
- convenciones;
- checklists por artefacto;
- escenarios de seguridad;
- tareas de verificación;
- selección predeterminada de un workflow existente.

### 10.2 Cuándo crear un schema empresarial

Se necesita un schema cuando el proceso exige:

- un artefacto de threat model;
- aprobación de arquitectura antes de tareas;
- revisión de seguridad como dependencia;
- evidencia de pruebas separada;
- artefactos regulatorios;
- otro orden de planificación;
- bloqueo de `apply` hasta completar artefactos adicionales.

Ejemplo conceptual:

```text
proposal
├── specs
├── design
└── threat-model
        ↓
security-review
        ↓
tasks
        ↓
apply
```

Incluso un schema así sigue sin reemplazar los gates de GitHub y CI. Hace más
explícito el proceso de planificación, no lo vuelve automáticamente obligatorio
fuera del agente.

## 11. Decisión

La configuración recomendada para una empresa es:

1. mantener `openspec/config.yaml` en Git;
2. usar `context` solo para restricciones transversales y estables;
3. distribuir obligaciones entre `proposal`, `specs`, `design` y `tasks`;
4. inspeccionar `openspec instructions ... --json`;
5. convertir warnings y drift en fallos de CI propios;
6. proteger configuración y schemas con CODEOWNERS;
7. crear un schema empresarial cuando se requieran artefactos o dependencias
   obligatorias;
8. conservar controles de seguridad independientes del agente.

El impacto esperado es una planificación más consistente y alineada con la
organización. No hay evidencia controlada de que esta configuración reduzca
defectos por sí sola. Su valor depende de la calidad de las reglas, la revisión
de los artefactos y la capacidad de convertirlos en controles verificables.

## 12. Limitaciones y revalidación

- El análisis corresponde a OpenSpec 1.6.0 y al commit indicado.
- `references` y `store` evolucionaron más allá de la introducción básica de
  `docs/customization.md`; deben revalidarse contra código y CLI al actualizar.
- No se encontró validación oficial de cumplimiento semántico de `rules`.
- No se encontró mitigación específica documentada para prompt injection en
  `context` o `rules`.
- Los schemas comunitarios no fueron auditados en esta investigación.
- Debe revalidarse ante cambios de versión, formato del YAML, resolución de
  stores, orden de inyección o comandos de validación.

## 13. Referencias

- **[O1]** Fission-AI. [Release `v1.6.0`](https://github.com/Fission-AI/OpenSpec/releases/tag/v1.6.0), publicada el 10-07-2026.
- **[O2]** Fission-AI. [`docs/customization.md`](https://github.com/Fission-AI/OpenSpec/blob/11a301d5fbddf6e5628e82b4feb5807538884dbc/docs/customization.md), niveles de personalización, configuración, inyección, precedencia y schemas personalizados.
- **[O3]** Fission-AI. [`src/core/project-config.ts`](https://github.com/Fission-AI/OpenSpec/blob/11a301d5fbddf6e5628e82b4feb5807538884dbc/src/core/project-config.ts), tipos, parseo resiliente, límite de contexto, `references`, `store` y resolución `.yaml`/`.yml`.
- **[O4]** Fission-AI. [`src/core/init.ts`](https://github.com/Fission-AI/OpenSpec/blob/11a301d5fbddf6e5628e82b4feb5807538884dbc/src/core/init.ts#L766-L783) y [`src/core/config-prompts.ts`](https://github.com/Fission-AI/OpenSpec/blob/11a301d5fbddf6e5628e82b4feb5807538884dbc/src/core/config-prompts.ts), creación inicial y ejemplos comentados.
- **[O5]** Fission-AI. [`docs/migration-guide.md`](https://github.com/Fission-AI/OpenSpec/blob/11a301d5fbddf6e5628e82b4feb5807538884dbc/docs/migration-guide.md#L57-L80), migración desde `project.md` y recomendación de concisión.
- **[O6]** Fission-AI. [`docs/cli.md`](https://github.com/Fission-AI/OpenSpec/blob/11a301d5fbddf6e5628e82b4feb5807538884dbc/docs/cli.md), stores, references, `instructions`, schemas y configuración global.
- **[O7]** Fission-AI. [`src/core/artifact-graph/instruction-loader.ts`](https://github.com/Fission-AI/OpenSpec/blob/11a301d5fbddf6e5628e82b4feb5807538884dbc/src/core/artifact-graph/instruction-loader.ts#L317-L389), orden y campos de las instrucciones enriquecidas.
- **[O8]** Fission-AI. [`src/utils/change-metadata.ts`](https://github.com/Fission-AI/OpenSpec/blob/11a301d5fbddf6e5628e82b4feb5807538884dbc/src/utils/change-metadata.ts#L155-L190), resolución del schema.
- **[O9]** Fission-AI. [`SECURITY.md`](https://github.com/Fission-AI/OpenSpec/blob/11a301d5fbddf6e5628e82b4feb5807538884dbc/SECURITY.md#L13-L26), threat model y archivos de configuración/specs como superficie de seguridad.
- **[O10]** Fission-AI. [`openspec/config.yaml`](https://github.com/Fission-AI/OpenSpec/blob/11a301d5fbddf6e5628e82b4feb5807538884dbc/openspec/config.yaml), uso real del proyecto para lenguaje de producto y compatibilidad multiplataforma.
