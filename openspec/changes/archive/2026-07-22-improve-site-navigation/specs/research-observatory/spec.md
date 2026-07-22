## ADDED Requirements

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
