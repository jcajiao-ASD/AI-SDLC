## ADDED Requirements

### Requirement: Reglas de recomendación con claves estables
Los datasets usados por selectores deterministas SHALL declarar una clave estable
para cada contexto y candidatos explícitos mediante la sintaxis `rol:clave`. Las
listas SHALL usar un delimitador declarado y validado, y cada rol SHALL pertenecer
al catálogo `primary`, `co-primary`, `alternative`, `pilot` o `none`.

#### Scenario: Regla con candidato inexistente
- **WHEN** una regla referencia una clave de agente, modelo o framework no declarada por los datasets aplicables
- **THEN** la validación SHALL fallar e identificar el dataset, fila y clave incorrecta

#### Scenario: Rol de candidato inválido
- **WHEN** una regla usa un rol desconocido o una entrada sin la forma `rol:clave`
- **THEN** la validación SHALL fallar antes de construir la historia

#### Scenario: Regla sin candidato principal
- **WHEN** una regla no contiene `primary`, `co-primary`, `pilot` ni `none`
- **THEN** la validación SHALL fallar en lugar de promover una alternativa implícitamente

### Requirement: Matrices canónicas de compatibilidad
La compatibilidad agente-modelo y agente-framework SHALL residir en tablas GFM
anotadas con identificadores únicos, claves de ambos componentes, estado,
mecanismo, nota, fuente y fecha de verificación.

#### Scenario: Estado fuera del catálogo
- **WHEN** una fila de compatibilidad usa un estado distinto de `nativa`, `condicionada`, `incompatible` o `no-confirmada`
- **THEN** la validación SHALL fallar con un diagnóstico localizado

#### Scenario: Relación duplicada
- **WHEN** una matriz declara más de una fila para la misma pareja de claves
- **THEN** la construcción SHALL fallar antes de resolver recomendaciones ambiguas

#### Scenario: Relación sin procedencia
- **WHEN** una fila omite su fuente o fecha de verificación
- **THEN** el dataset SHALL considerarse inválido

### Requirement: Relaciones editoriales con múltiples historias
El frontmatter SHALL permitir conservar una historia principal y declarar una
lista opcional de historias relacionadas mediante slugs válidos y únicos.

#### Scenario: Estudio con historia transversal
- **WHEN** un estudio alimenta su historia especializada y el configurador integrado
- **THEN** el modelo normalizado SHALL exponer ambas relaciones sin duplicarlas

#### Scenario: Historia relacionada inexistente
- **WHEN** el frontmatter declara una historia relacionada que no corresponde a una ruta registrada
- **THEN** la validación SHALL fallar e identificar el estudio y slug inválido
