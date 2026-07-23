# Purpose

TBD.

## Requirements

### Requirement: Vista embebida en la página de investigación de OpenSpec
El observatorio SHALL presentar el diagrama interactivo de la ceremonia de
OpenSpec dentro de la página de investigación existente del estudio
OpenSpec, y MUST NOT introducir una ruta nueva fuera de esa página para
acceder a él.

#### Scenario: Acceso desde el artículo
- **WHEN** un usuario abre la página de investigación de OpenSpec
- **THEN** SHALL encontrar el diagrama interactivo en esa misma página, sin navegar a una URL distinta

### Requirement: Dos ejemplos organizados en una sola vista
El diagrama SHALL presentar, dentro de una sola vista, el ejemplo de
ceremonia normal (`explore → propose → apply → sync → archive`) y el
ejemplo de ceremonia con solicitud de cambios (checkpoint de revisión antes
de `apply` que vuelve a `propose`), y SHALL permitir distinguir en todo
momento cuál de los dos ejemplos está activo.

#### Scenario: Alternar entre ejemplos
- **WHEN** un usuario cambia del ejemplo de ceremonia normal al de solicitud de cambios
- **THEN** el diagrama SHALL resaltar la arista de retorno a `propose` y el panel de detalle SHALL describir el checkpoint de revisión correspondiente

#### Scenario: Estado inicial sin interacción
- **WHEN** un usuario abre la vista por primera vez
- **THEN** SHALL ver el ejemplo de ceremonia normal activo por defecto, con una indicación visible de que existe un segundo ejemplo

### Requirement: Fidelidad del contenido al estudio fuente
Los pasos, comandos y descripciones mostrados en el diagrama SHALL
corresponder a los ya documentados en el estudio de OpenSpec y MUST NOT
introducir comandos, acciones o afirmaciones no presentes en ese estudio.

#### Scenario: Paso expandido muestra comando real
- **WHEN** un usuario expande un paso del diagrama
- **THEN** SHALL ver el comando o acción tal como aparece documentado en el estudio, sin reinterpretarlo

### Requirement: Fallback textual accesible sin JavaScript
Cada ejemplo del diagrama SHALL conservar una lista o tabla equivalente con
los mismos pasos, comandos y la bifurcación representada, disponible sin
JavaScript, color ni interacción de puntero.

#### Scenario: Diagrama no hidratado
- **WHEN** el script del componente no se ejecuta
- **THEN** el usuario SHALL poder leer los mismos pasos y comandos de ambos ejemplos en su equivalente textual

### Requirement: Alternancia operable por teclado
El control que cambia entre los dos ejemplos y los pasos expandibles del
diagrama SHALL ser operable mediante teclado.

#### Scenario: Cambio de ejemplo por teclado
- **WHEN** un usuario navega con teclado hasta el control de alternancia y lo activa
- **THEN** el diagrama SHALL cambiar de ejemplo igual que con un puntero, y el foco SHALL permanecer en un elemento visible y coherente

### Requirement: Movimiento reducido respetado
Las transiciones que resaltan o atenúan pasos y aristas del diagrama SHALL
omitirse cuando el usuario tiene activada la preferencia de movimiento
reducido del sistema, sin ocultar información.

#### Scenario: Preferencia de movimiento reducido activa
- **WHEN** el usuario tiene `prefers-reduced-motion: reduce` activo
- **THEN** el cambio entre ejemplos SHALL aplicarse sin animación de transición, mostrando el mismo resultado final
