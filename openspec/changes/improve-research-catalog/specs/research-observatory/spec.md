## ADDED Requirements

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
