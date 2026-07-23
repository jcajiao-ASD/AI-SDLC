## ADDED Requirements

### Requirement: Contrato compartido de tablas
El sistema de diseño SHALL definir una estructura y comportamiento comunes para
tablas renderizadas desde Markdown y para tablas construidas desde datasets
normalizados. Ambas rutas SHALL conservar caption, encabezados, celdas, enlaces
y asociaciones semánticas equivalentes. La metadata adaptativa SHALL referirse a
encabezados existentes y MUST ser validada antes de renderizarse.

#### Scenario: Tabla de investigación
- **WHEN** el pipeline renderiza una tabla GFM dentro de una investigación
- **THEN** SHALL envolverla con el mismo contrato accesible y responsive usado por los componentes de datos

#### Scenario: Directiva editorial válida
- **WHEN** una tabla Markdown declara encabezado de fila, columnas esenciales, columnas inicialmente ocultas o columnas de resumen
- **THEN** el pipeline SHALL normalizar la directiva al contrato compartido sin copiar valores fuera de la tabla

#### Scenario: Directiva editorial inválida
- **WHEN** la metadata referencia un encabezado inexistente o declara una columna como esencial e inicialmente oculta
- **THEN** la validación de contenido MUST fallar con la tabla y la referencia inválida identificadas

#### Scenario: Tabla de historia
- **WHEN** una historia renderiza un dataset mediante el componente compartido
- **THEN** SHALL exponer la misma semántica de región, caption y estados responsive sin copiar valores fuera del dataset

### Requirement: Adaptación proporcional a la tabla
El sistema SHALL aplicar mejoras según la estructura declarada y MUST NOT añadir
selectores o resúmenes heurísticos a tablas compactas o sin metadata suficiente.
El número de columnas podrá determinar contención y densidad, pero MUST NOT
inferir identidad, importancia ni conclusiones.

#### Scenario: Tabla compacta sin metadata adaptativa
- **WHEN** una tabla de dos a cuatro columnas cabe en su región y no declara columnas opcionales o resumen
- **THEN** SHALL conservar una presentación simple sin selector de columnas

#### Scenario: Tabla amplia sin identidad declarada
- **WHEN** una tabla de cinco o más columnas no declara encabezado de fila
- **THEN** SHALL usar encabezado sticky y scroll contenido, pero MUST NOT fijar una columna ni generar resumen móvil

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
- **THEN** sus celdas SHALL usar encabezados de fila con `scope="row"`, permanecer visibles durante desplazamiento horizontal y distinguir su superposición sin depender solo del color

#### Scenario: Tabla no apta para columna sticky
- **WHEN** fijar la primera columna ocultaría contenido o no existe identificador válido
- **THEN** el sistema MUST NOT aplicar ese comportamiento y SHALL conservar un fallback desplazable

### Requirement: Visibilidad controlada de columnas
Las tablas con columnas opcionales SHALL permitir mostrar u ocultar esas
columnas mediante controles accesibles basados en sus encabezados. Las columnas
esenciales MUST NOT ocultarse y todos los valores SHALL permanecer en el HTML
canónico.

#### Scenario: Columnas inicialmente ocultas
- **WHEN** JavaScript inicializa una tabla con columnas opcionales declaradas como inicialmente ocultas
- **THEN** esas columnas SHALL comenzar desactivadas, el selector SHALL anunciarlas como disponibles y el usuario SHALL poder mostrarlas

#### Scenario: Ocultar una columna opcional
- **WHEN** un usuario desactiva una columna mediante teclado
- **THEN** su encabezado y celdas SHALL dejar de mostrarse, el control SHALL comunicar su estado y las columnas esenciales SHALL permanecer visibles

#### Scenario: JavaScript no disponible
- **WHEN** JavaScript está deshabilitado
- **THEN** la ocultación inicial MUST NOT retirar valores y todos los datos SHALL permanecer alcanzables en la representación activa

#### Scenario: Referencias esenciales por esquema
- **WHEN** un dataset de compatibilidad, ranking o recomendación se valida
- **THEN** SHALL declarar respectivamente agente-componente-estado, sujeto-puesto-puntuación o contexto-recomendación-motivo como columnas esenciales

### Requirement: Resumen móvil derivado por filas
Las tablas aptas para adaptación SHALL proporcionar en pantallas estrechas una
vista por filas desplegables. Cada summary y detalle SHALL derivarse
exclusivamente de encabezados y celdas existentes y MUST NOT introducir cifras,
etiquetas, ganadores o conclusiones nuevas.

#### Scenario: Apertura de una fila en móvil
- **WHEN** un usuario activa el resumen de una fila
- **THEN** SHALL consultar todos los pares encabezado-valor de esa fila, incluidos columnas esenciales, enlaces y formato significativo

#### Scenario: Tabla irregular
- **WHEN** una tabla carece de encabezados, identificador o filas regulares suficientes
- **THEN** MUST NOT generarse un resumen heurístico y SHALL conservarse la tabla desplazable

#### Scenario: Representación única por breakpoint
- **WHEN** una tabla y su resumen móvil existen en el mismo documento
- **THEN** solo la representación correspondiente al breakpoint SHALL estar expuesta visualmente y a tecnologías de asistencia

### Requirement: Jerarquía visual de evidencia
Las tablas SHALL usar la paleta Tinta Costera y el sistema tipográfico híbrido
para distinguir estructura, datos compactos y contenido narrativo. La
intersección sticky de encabezado y columna identificadora SHALL formar un marco
de contexto reconocible mediante reglas o sombra, sin depender solo del color.

#### Scenario: Celda narrativa
- **WHEN** una columna se declara como contenido de prosa
- **THEN** sus celdas SHALL usar Atkinson Hyperlegible Next y conservar el formato inline significativo

#### Scenario: Etiqueta técnica o dato compacto
- **WHEN** se presenta un encabezado de columna, identificador, métrica, estado o fecha declarada como dato
- **THEN** SHALL usar el rol JetBrains Mono previsto para datos, metadatos y etiquetas técnicas

#### Scenario: Vista móvil
- **WHEN** una tabla apta se presenta como filas desplegables
- **THEN** SHALL usar filas planas separadas por reglas y MUST NOT convertir cada fila en una tarjeta decorativa

### Requirement: Navegación accesible de tablas
Cada tabla amplia SHALL permanecer contenida sin provocar desplazamiento
horizontal de la página completa. Su región SHALL ser identificable, operable
por teclado y SHALL permitir entrar y salir sin trampa de foco.

#### Scenario: Tabla Markdown sin caption
- **WHEN** una tabla de investigación no incluye caption explícito
- **THEN** su región SHALL usar el encabezado de sección más cercano y un ordinal real de esa sección para obtener un nombre accesible estable

#### Scenario: Consulta mediante teclado
- **WHEN** un usuario enfoca una región de tabla y la desplaza
- **THEN** SHALL conservar acceso a enlaces y controles internos y SHALL poder continuar hacia el contenido siguiente

#### Scenario: Pantalla estrecha
- **WHEN** una tabla excede el ancho disponible y no usa vista resumida
- **THEN** el desplazamiento SHALL limitarse a la región de tabla y todos los valores SHALL permanecer alcanzables
