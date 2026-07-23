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

### Requirement: Búsqueda y ordenamiento del catálogo
El catálogo SHALL permitir buscar estudios por título, resumen y metadatos
visibles, y SHALL permitir ordenarlos por relevancia, fecha de corte y título.
La búsqueda y el ordenamiento SHALL ser deterministas y MUST NOT inspeccionar ni
inferir contenido fuera del modelo normalizado del catálogo.

#### Scenario: Búsqueda textual normalizada
- **WHEN** un usuario introduce una consulta con diferencias de mayúsculas o diacríticos
- **THEN** el catálogo SHALL mostrar los estudios cuyo título, resumen o metadatos visibles contengan la consulta normalizada

#### Scenario: Ordenamiento por fecha
- **WHEN** un usuario selecciona fecha de corte
- **THEN** los estudios SHALL ordenarse de forma descendente y los empates SHALL resolverse de manera estable

#### Scenario: Relevancia sin consulta
- **WHEN** no existe una consulta textual activa
- **THEN** el catálogo MUST NOT presentar un orden de relevancia inventado y SHALL usar el orden predeterminado documentado

### Requirement: Estado visible y reversible del catálogo
El catálogo SHALL representar cada búsqueda o filtro activo mediante controles y
chips removibles, SHALL ofrecer una acción para limpiar todo el estado y SHALL
mostrar el número de resultados. Cuando no existan coincidencias, SHALL explicar
el estado y proporcionar una forma directa de restablecer criterios.

#### Scenario: Eliminación de un filtro individual
- **WHEN** un usuario activa el control de eliminación de un chip
- **THEN** solo ese criterio SHALL retirarse y los resultados y controles SHALL actualizarse de forma consistente

#### Scenario: Limpieza completa
- **WHEN** un usuario activa `Limpiar filtros`
- **THEN** búsqueda, filtros y ordenamiento SHALL regresar a sus valores predeterminados y el catálogo completo SHALL volver a estar disponible

#### Scenario: Ningún resultado
- **WHEN** la combinación activa no produce estudios
- **THEN** el catálogo SHALL anunciar cero resultados, identificar que los criterios son la causa y ofrecer restablecerlos

### Requirement: URL persistente del catálogo
El catálogo SHALL serializar búsqueda, filtros y ordenamiento en parámetros de
URL estables, SHALL restaurarlos al abrir un enlace compartido y SHALL responder
a navegación atrás y adelante. Los parámetros SHALL conservar el subpath
configurado y los valores desconocidos SHALL ignorarse sin ocultar el corpus.

#### Scenario: Enlace compartido
- **WHEN** un usuario abre una URL del catálogo con parámetros válidos
- **THEN** los controles, chips, ordenamiento y resultados SHALL representar ese estado

#### Scenario: Navegación por historial
- **WHEN** un usuario modifica criterios y después usa atrás o adelante
- **THEN** el catálogo SHALL restaurar el estado correspondiente sin recargar la página completa

#### Scenario: Parámetro inválido
- **WHEN** la URL contiene un filtro u orden desconocido
- **THEN** el catálogo SHALL ignorarlo, conservar los criterios válidos y MUST NOT producir una vista vacía por defecto

### Requirement: Resultados completamente accionables
Cada resultado del catálogo SHALL proporcionar un único destino principal para
abrir la investigación y SHALL hacer accionable toda la superficie sin enlaces o
controles interactivos anidados. La interacción SHALL disponer de estados de
hover, foco y activación coherentes con el sistema visual.

#### Scenario: Apertura mediante teclado
- **WHEN** un usuario enfoca una tarjeta de investigación y la activa
- **THEN** SHALL navegar a la ruta estable del estudio y el foco SHALL haber sido visible antes de la activación

#### Scenario: Superficie sin affordance falsa
- **WHEN** un elemento del resultado no constituye una acción independiente
- **THEN** MUST NOT responder como control adicional ni crear un segundo destino ambiguo

### Requirement: Mejora progresiva del catálogo avanzado
El HTML estático del catálogo SHALL contener todos los estudios y sus destinos.
Cuando JavaScript no esté disponible, los resultados completos SHALL permanecer
visibles y navegables, aunque búsqueda, ordenamiento, chips e historial no se
apliquen dinámicamente.

#### Scenario: JavaScript deshabilitado
- **WHEN** un usuario abre el catálogo sin JavaScript
- **THEN** SHALL poder recorrer y abrir todos los estudios sin depender de los controles hidratados

#### Scenario: URL filtrada sin JavaScript
- **WHEN** un usuario abre una URL con parámetros y JavaScript está deshabilitado
- **THEN** el catálogo SHALL mostrar el corpus completo en lugar de ocultar resultados mediante un estado no ejecutable
