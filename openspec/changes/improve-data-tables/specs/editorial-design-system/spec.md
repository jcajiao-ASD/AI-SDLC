## ADDED Requirements

### Requirement: Contrato compartido de tablas
El sistema de diseño SHALL definir una estructura y comportamiento comunes para
tablas renderizadas desde Markdown y para tablas construidas desde datasets
normalizados. Ambas rutas SHALL conservar caption, encabezados, celdas, enlaces
y asociaciones semánticas equivalentes.

#### Scenario: Tabla de investigación
- **WHEN** el pipeline renderiza una tabla GFM dentro de una investigación
- **THEN** SHALL envolverla con el mismo contrato accesible y responsive usado por los componentes de datos

#### Scenario: Tabla de historia
- **WHEN** una historia renderiza un dataset mediante el componente compartido
- **THEN** SHALL exponer la misma semántica de región, caption y estados responsive sin copiar valores fuera del dataset

### Requirement: Contexto persistente dentro de tablas extensas
Las tablas extensas SHALL mantener visible su encabezado durante el
desplazamiento interno y SHALL poder mantener una columna identificadora
prioritaria cuando la estructura y el ancho lo permitan. El tratamiento sticky
MUST NOT ocultar celdas enfocadas ni reducir el contenido restante a una anchura
ilegible.

#### Scenario: Desplazamiento vertical
- **WHEN** un usuario recorre una tabla más alta que su región visible
- **THEN** los encabezados de columna SHALL permanecer disponibles como contexto

#### Scenario: Primera columna prioritaria
- **WHEN** una tabla declara una columna identificadora y dispone de ancho suficiente
- **THEN** esa columna SHALL permanecer visible durante desplazamiento horizontal y SHALL distinguir su superposición sin depender solo del color

#### Scenario: Tabla no apta para columna sticky
- **WHEN** fijar la primera columna ocultaría contenido o no existe identificador válido
- **THEN** el sistema MUST NOT aplicar ese comportamiento y SHALL conservar un fallback desplazable

### Requirement: Visibilidad controlada de columnas
Las tablas con columnas opcionales SHALL permitir mostrar u ocultar esas
columnas mediante controles accesibles basados en sus encabezados. Las columnas
esenciales MUST NOT ocultarse y todos los valores SHALL permanecer en el HTML
canónico.

#### Scenario: Ocultar una columna opcional
- **WHEN** un usuario desactiva una columna mediante teclado
- **THEN** su encabezado y celdas SHALL dejar de mostrarse, el control SHALL comunicar su estado y las columnas esenciales SHALL permanecer visibles

#### Scenario: JavaScript no disponible
- **WHEN** JavaScript está deshabilitado
- **THEN** todas las columnas SHALL permanecer visibles dentro de la representación tabular completa

### Requirement: Resumen móvil derivado por filas
Las tablas aptas para adaptación SHALL proporcionar en pantallas estrechas una
vista por filas desplegables. Cada summary y detalle SHALL derivarse
exclusivamente de encabezados y celdas existentes y MUST NOT introducir cifras,
etiquetas, ganadores o conclusiones nuevas.

#### Scenario: Apertura de una fila en móvil
- **WHEN** un usuario activa el resumen de una fila
- **THEN** SHALL consultar los pares encabezado-valor de esa fila, incluidos sus enlaces y formato significativo

#### Scenario: Tabla irregular
- **WHEN** una tabla carece de encabezados, identificador o filas regulares suficientes
- **THEN** MUST NOT generarse un resumen heurístico y SHALL conservarse la tabla desplazable

### Requirement: Navegación accesible de tablas
Cada tabla amplia SHALL permanecer contenida sin provocar desplazamiento
horizontal de la página completa. Su región SHALL ser identificable, operable
por teclado y SHALL permitir entrar y salir sin trampa de foco.

#### Scenario: Consulta mediante teclado
- **WHEN** un usuario enfoca una región de tabla y la desplaza
- **THEN** SHALL conservar acceso a enlaces y controles internos y SHALL poder continuar hacia el contenido siguiente

#### Scenario: Pantalla estrecha
- **WHEN** una tabla excede el ancho disponible y no usa vista resumida
- **THEN** el desplazamiento SHALL limitarse a la región de tabla y todos los valores SHALL permanecer alcanzables
