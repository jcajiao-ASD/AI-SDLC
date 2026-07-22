# Purpose

TBD.

## Requirements

### Requirement: Portada orientada a decisiones
La portada SHALL presentar el configurador integrado como acceso para componer
un stack, mantener visibles las tres áreas de decisión y sus historias
insignia, y ofrecer rutas hacia la evidencia antes que una lista plana de
documentos.

#### Scenario: Primera visita
- **WHEN** un líder técnico abre la portada
- **THEN** SHALL poder iniciar una recomendación integrada y acceder por separado a agentes, modelos y metodologías sin conocer los nombres de los archivos

### Requirement: Catálogo completo y navegable
El observatorio SHALL listar todos los estudios del corpus con título, resumen,
categoría, estado, fecha de corte y nivel de evidencia.

#### Scenario: Exploración del corpus
- **WHEN** un usuario abre el catálogo
- **THEN** SHALL poder distinguir el tema y vigencia de cada estudio antes de abrirlo

### Requirement: Filtros de catálogo
El catálogo SHALL permitir filtrar estudios por categoría, estado, fecha de corte
y tipo de decisión sin recargar la página completa.

#### Scenario: Filtrado por categoría
- **WHEN** un usuario selecciona la categoría de metodologías y frameworks
- **THEN** el catálogo SHALL mostrar solo los estudios que declaran esa categoría

#### Scenario: JavaScript no disponible
- **WHEN** JavaScript está deshabilitado
- **THEN** el catálogo completo SHALL permanecer visible y navegable

### Requirement: Lectura completa de investigaciones
Cada estudio SHALL disponer de una ruta estable que renderice su contenido,
índice, tablas, enlaces y referencias sin eliminar detalle respecto del Markdown
fuente.

#### Scenario: Apertura desde el catálogo
- **WHEN** un usuario selecciona un estudio
- **THEN** SHALL acceder a su lectura completa y a enlaces hacia historias relacionadas

### Requirement: Navegación transversal
El observatorio SHALL ofrecer navegación consistente entre portada, catálogo,
estudios, historias y metodología, e SHALL indicar la ubicación actual.

#### Scenario: Retorno desde una referencia
- **WHEN** un usuario termina de revisar el detalle metodológico de un estudio
- **THEN** SHALL poder regresar a la historia o catálogo relacionado mediante navegación visible

### Requirement: Publicación estática
Todas las rutas de contenido SHALL generarse como HTML estático compatible con
el subpath configurado para GitHub Pages.

#### Scenario: Acceso directo a una ruta
- **WHEN** un usuario abre directamente una URL publicada de estudio o historia
- **THEN** GitHub Pages SHALL servir el contenido correcto sin requerir un servidor de aplicación

### Requirement: Arquitectura de navegación orientada a tareas
El observatorio SHALL organizar su navegación primaria en las áreas `Decidir` y
`Explorar`. `Decidir` SHALL proporcionar destinos diferenciados para Modelo,
Agente, Framework y Stack, mientras `Explorar` SHALL proporcionar destinos para
Investigaciones y Metodología. `Sistema de diseño` MUST NOT ocupar la navegación
primaria y SHALL permanecer disponible como recurso secundario.

#### Scenario: Acceso a las decisiones principales
- **WHEN** un usuario abre cualquier ruta del observatorio
- **THEN** SHALL poder acceder a Modelo, Agente, Framework y Stack desde el área `Decidir` sin conocer los slugs de las historias

#### Scenario: Acceso a exploración y recursos secundarios
- **WHEN** un usuario necesita recorrer el corpus o consultar la metodología
- **THEN** SHALL encontrar Investigaciones y Metodología en `Explorar`, y SHALL encontrar Sistema de diseño fuera de la navegación primaria

### Requirement: Ubicación activa y breadcrumbs
El observatorio SHALL comunicar la ubicación actual mediante un estado activo en
la navegación primaria y breadcrumbs compartidos en las rutas interiores. El
estado activo SHALL usar semántica accesible y MUST NOT depender únicamente del
color; el último breadcrumb SHALL representar la página actual y MUST NOT ser un
enlace.

#### Scenario: Historia de decisión activa
- **WHEN** un usuario abre una historia de Modelo, Agente, Framework o Stack
- **THEN** el destino correspondiente de `Decidir` SHALL exponer su estado actual y los breadcrumbs SHALL mostrar la ruta desde el observatorio hasta la historia

#### Scenario: Investigación individual
- **WHEN** un usuario abre una investigación
- **THEN** Investigaciones SHALL permanecer activa y los breadcrumbs SHALL permitir regresar al catálogo

#### Scenario: Ruta publicada bajo subpath
- **WHEN** el observatorio se publica bajo el subpath configurado para GitHub Pages
- **THEN** todos los destinos de navegación y breadcrumbs SHALL conservar el base path y resolver la ruta correcta

### Requirement: Cabecera móvil compacta
En pantallas estrechas, el observatorio SHALL presentar una cabecera compacta
con marca, menú de navegación, acceso directo a `Decidir` y acceso etiquetado al
catálogo de investigaciones. El menú SHALL ser operable mediante teclado,
conservar foco visible y permanecer navegable sin JavaScript.

#### Scenario: Apertura del menú con teclado
- **WHEN** un usuario enfoca y activa el control de menú en móvil
- **THEN** SHALL acceder a todos los destinos primarios en un orden predecible y SHALL poder cerrar o abandonar el menú sin perder el foco

#### Scenario: JavaScript no disponible en móvil
- **WHEN** JavaScript está deshabilitado
- **THEN** los destinos de `Decidir` y `Explorar` SHALL permanecer visibles u operables mediante semántica HTML nativa

#### Scenario: Acceso a búsqueda
- **WHEN** un usuario activa el acceso de búsqueda desde la cabecera
- **THEN** SHALL llegar al catálogo de investigaciones sin que la cabecera implemente o duplique la lógica de búsqueda
