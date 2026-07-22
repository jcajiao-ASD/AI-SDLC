## ADDED Requirements

### Requirement: Identidad tipográfica JetBrains Mono
El sistema SHALL usar JetBrains Mono como familia tipográfica en todas las
superficies del observatorio y SHALL proporcionar localmente variantes normal e
itálica con los pesos utilizados por la interfaz, sin depender de un proveedor
de fuentes externo durante la navegación.

#### Scenario: Carga de la identidad tipográfica
- **WHEN** un usuario abre cualquier página publicada del observatorio
- **THEN** la interfaz SHALL resolver sus roles tipográficos a JetBrains Mono mediante assets servidos por el propio sitio

#### Scenario: Jerarquía mediante variantes reales
- **WHEN** una superficie presenta texto regular, enfatizado, cursivo o en negrita
- **THEN** SHALL usar una variante disponible de JetBrains Mono dentro de su rango soportado sin sintetizar pesos o estilos inexistentes

### Requirement: Legibilidad con tipografía monoespaciada
El sistema SHALL adaptar medidas de lectura, espaciado, escala y composición para
que la adopción de JetBrains Mono conserve la jerarquía editorial, la legibilidad
y el comportamiento responsive definidos por el sistema de diseño.

#### Scenario: Lectura de una investigación extensa
- **WHEN** un usuario lee prosa continua en una investigación
- **THEN** la longitud de línea y el interlineado SHALL mantener una medida legible con la familia monoespaciada

#### Scenario: Contenido tipográfico en pantalla estrecha
- **WHEN** títulos, navegación, controles o tablas se muestran en una pantalla móvil
- **THEN** el contenido SHALL ajustarse sin recorte ni desplazamiento horizontal de la página completa
