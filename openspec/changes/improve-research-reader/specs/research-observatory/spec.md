## ADDED Requirements

### Requirement: Índice estructural de investigaciones
Cada investigación SHALL renderizar una tabla de contenido derivada de sus
encabezados reales y SHALL conservar identificadores estables para navegación
por anclas. El índice MUST NOT depender de una copia manual de títulos ni
eliminar secciones del contenido canónico.

#### Scenario: Generación desde Markdown
- **WHEN** una investigación válida contiene encabezados de sección
- **THEN** el lector SHALL presentar enlaces de índice con el mismo texto, orden e identificadores generados para el contenido

#### Scenario: Enlace profundo publicado
- **WHEN** un usuario abre una URL de investigación con hash bajo el subpath de GitHub Pages
- **THEN** SHALL llegar a la sección correspondiente sin que la cabecera sticky oculte su encabezado

#### Scenario: JavaScript no disponible
- **WHEN** JavaScript está deshabilitado
- **THEN** la tabla de contenido SHALL permanecer como una lista estática de enlaces funcionales

### Requirement: Orientación progresiva durante la lectura
El lector SHALL indicar la sección activa y el progreso de lectura cuando el
navegador pueda calcularlos. Estos indicadores SHALL complementar el índice,
MUST NOT ser la única forma de orientación y SHALL respetar preferencias de
movimiento reducido.

#### Scenario: Cambio de sección activa
- **WHEN** un usuario desplaza el contenido hasta una nueva sección
- **THEN** el enlace correspondiente del índice SHALL comunicar su estado actual mediante semántica y un indicador no exclusivamente cromático

#### Scenario: Progreso accesible
- **WHEN** el progreso de lectura cambia
- **THEN** el indicador SHALL actualizar su valor accesible sin anunciar cada evento de desplazamiento como una alerta

#### Scenario: Movimiento reducido
- **WHEN** el dispositivo indica `prefers-reduced-motion`
- **THEN** el progreso y los cambios de sección SHALL conservar su estado sin transiciones no esenciales

### Requirement: Cartografía de evidencia en el lector
En escritorio, el lector SHALL organizar índice, contenido y evidencia como
zonas diferenciadas y SHALL mantener la conclusión próxima al encabezado. La
zona de evidencia SHALL consumir metadatos y fuentes canónicas y MUST NOT
duplicar manualmente conclusiones, fechas o niveles de evidencia.

#### Scenario: Lectura extensa en escritorio
- **WHEN** un usuario avanza por una investigación larga
- **THEN** SHALL poder consultar su posición y la ficha de evidencia sin perder la medida legible de la columna principal

#### Scenario: Evidencia desactualizada
- **WHEN** la investigación requiere revalidación
- **THEN** la zona de evidencia SHALL conservar la advertencia, fecha de corte y acceso a la procedencia mientras el usuario consulta el contenido

### Requirement: Paneles móviles de orientación
En pantallas estrechas, el índice y la evidencia SHALL presentarse mediante
paneles desplegables accesibles, mientras la conclusión y el contenido principal
SHALL permanecer próximos al encabezado. Los paneles SHALL ser operables por
teclado y sin JavaScript.

#### Scenario: Consulta del índice en móvil
- **WHEN** un usuario abre el panel de secciones
- **THEN** SHALL poder activar una sección y regresar al contenido sin quedar atrapado en el panel

#### Scenario: Consulta de evidencia en móvil
- **WHEN** un usuario abre el panel de evidencia
- **THEN** SHALL encontrar fecha de corte, vigencia, nivel de evidencia y tipo de decisión sin que esos datos sustituyan el contenido

### Requirement: Integración con navegación contextual
El lector SHALL consumir los breadcrumbs compartidos del observatorio para
representar Portada, Investigaciones y la investigación actual. MUST NOT
implementar una segunda definición de destinos o etiquetas de navegación.

#### Scenario: Retorno al catálogo
- **WHEN** un usuario activa el breadcrumb de Investigaciones
- **THEN** SHALL regresar al catálogo mediante una ruta compatible con el base path configurado
