# Purpose

TBD.

## Requirements

### Requirement: Portada orientada a decisiones
La portada SHALL presentar preguntas estratégicas, hallazgos vigentes, acceso a
las historias insignia y rutas hacia la evidencia antes que una lista plana de
documentos.

#### Scenario: Primera visita
- **WHEN** un líder técnico abre la portada
- **THEN** SHALL identificar las tres áreas de decisión y acceder a una recomendación sin conocer los nombres de los archivos

### Requirement: Catálogo completo y navegable
El observatorio SHALL listar los trece estudios con título, resumen, categoría,
estado, fecha de corte y nivel de evidencia.

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
