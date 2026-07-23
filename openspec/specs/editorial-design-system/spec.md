# Purpose

TBD.

## Requirements

### Requirement: Fundamentos visuales compartidos
El sistema SHALL definir tokens reutilizables y funcionales para color,
tipografía, espaciado, grid, radios, elevación, superficies y movimiento, y
SHALL usarlos en todas las superficies del observatorio. Los componentes MUST
NOT declarar directamente valores visuales que ya correspondan a un rol
compartido.

#### Scenario: Composición consistente
- **WHEN** una página del observatorio presenta contenido editorial, controles o datos
- **THEN** sus estilos SHALL resolverse mediante los tokens y fundamentos compartidos correspondientes a la función de cada elemento

#### Scenario: Variación de un rol compartido
- **WHEN** cambia el contraste, tipografía o tratamiento de un rol semántico
- **THEN** las superficies consumidoras SHALL adoptar el cambio sin requerir valores duplicados en cada componente

### Requirement: Dirección editorial tecnológica
El sistema SHALL presentar una identidad visual fresca, moderna, aireada y
orientada a visualización de datos, con profundidad índigo sin pesadez y con
jerarquías que diferencien preguntas, conclusiones, tradeoffs, caveats y
evidencia.

#### Scenario: Lectura de una conclusión
- **WHEN** un usuario abre una historia de decisión
- **THEN** la conclusión ejecutiva SHALL distinguirse visual y semánticamente del detalle metodológico mediante la gramática Tinta Costera compartida

### Requirement: Identidad cromática Tinta Costera
El sistema SHALL conservar `#12233F`, `#243B77`, `#2F7EA8`, `#CBEAF2` y
`#F7FBFF` como valores primitivos de la identidad compartida y SHALL asignarlos
mediante tokens semánticos de texto, navegación, acción, foco, selección,
gráficos y superficies. Los colores auxiliares de estado SHALL declararse como
tokens semánticos y MUST NOT definirse directamente dentro de componentes.

#### Scenario: Aplicación de la paleta en una página
- **WHEN** una página renderiza navegación, contenido, acciones, gráficos y secciones
- **THEN** cada función cromática SHALL resolverse mediante un token semántico asociado a la paleta Tinta Costera o a un estado documentado

#### Scenario: Estado positivo sin verde
- **WHEN** un badge, resultado o mensaje comunica un estado positivo o verificado
- **THEN** SHALL usar la gama azul de Tinta Costera junto con texto, icono o borde identificable y MUST NOT depender de un verde

#### Scenario: Acento decorativo
- **WHEN** un elemento usa color únicamente para énfasis de marca
- **THEN** SHALL usar el teal `#2F7EA8` u otro rol de Tinta Costera y MUST NOT usar colores auxiliares de estado como decoración

#### Scenario: Advertencia consistente
- **WHEN** un caveat, badge o resultado comunica una advertencia
- **THEN** SHALL usar los mismos tokens semánticos de advertencia y MUST NOT declarar tonos diferentes en cada componente

### Requirement: Contraste de la paleta costera
El sistema SHALL asignar los colores Tinta Costera según su función y contraste,
de modo que texto, controles, foco y codificaciones gráficas cumplan WCAG 2.2
nivel AA. El teal `#2F7EA8` MUST NOT usarse como texto normal sobre `#F7FBFF`
cuando esa combinación no alcance el contraste requerido.

#### Scenario: Texto interactivo sobre fondo claro
- **WHEN** un enlace, botón o etiqueta de tamaño normal se presenta sobre `#F7FBFF` o blanco
- **THEN** SHALL usar `#243B77`, `#12233F` u otra combinación que alcance el contraste AA aplicable

#### Scenario: Teal como recurso no textual
- **WHEN** `#2F7EA8` se usa en un icono, borde de control, indicador de foco o marca gráfica
- **THEN** SHALL mantener el contraste no textual requerido frente al fondo adyacente

### Requirement: Componentes editoriales reutilizables
El sistema SHALL proporcionar componentes reutilizables para resúmenes
ejecutivos, callouts, badges de estado, caveats, referencias, tablas, filtros y
fichas de evidencia.

#### Scenario: Reutilización entre superficies
- **WHEN** la portada y una historia muestran el mismo tipo de estado o evidencia
- **THEN** ambas SHALL usar el mismo componente y significado visual

### Requirement: Gramática compartida de visualización
El sistema SHALL definir primitivas reutilizables para escalas, ejes, leyendas,
tooltips, selección y estados de datos, mientras que cada historia SHALL componer
esas primitivas según su pregunta específica.

#### Scenario: Consistencia entre gráficas
- **WHEN** dos historias representan confianza o vigencia
- **THEN** SHALL usar la misma codificación visual y textual documentada

### Requirement: Accesibilidad visual y de interacción
El sistema SHALL cumplir WCAG 2.2 nivel AA, SHALL mantener foco visible y
navegación por teclado, SHALL respetar `prefers-reduced-motion` y SHALL evitar
usar color como único medio para comunicar información.

#### Scenario: Uso sin percepción de color
- **WHEN** una gráfica diferencia candidatos o estados
- **THEN** cada diferencia SHALL contar también con etiqueta, patrón, forma o texto identificable

#### Scenario: Movimiento reducido
- **WHEN** el dispositivo indica preferencia por movimiento reducido
- **THEN** las transiciones no esenciales SHALL desactivarse o reducirse

### Requirement: Comportamiento responsive
El sistema SHALL conservar jerarquía, legibilidad y acceso a los datos en
pantallas móviles, tabletas y escritorio sin desplazamiento horizontal de la
página completa.

#### Scenario: Tabla amplia en móvil
- **WHEN** una tabla excede el ancho disponible
- **THEN** SHALL usar un contenedor accesible o una representación adaptada sin recortar valores

### Requirement: Sistema tipográfico híbrido
El sistema SHALL usar Atkinson Hyperlegible Next para interfaz, navegación,
controles, titulares y prosa, y SHALL reservar JetBrains Mono para datos,
cifras, comandos, metadatos y etiquetas técnicas. Ambas familias SHALL
proporcionarse mediante assets servidos por el propio sitio.

#### Scenario: Carga local de las familias tipográficas
- **WHEN** un usuario abre cualquier ruta publicada del observatorio
- **THEN** los roles tipográficos SHALL resolverse con assets del mismo origen y MUST NOT requerir solicitudes a un proveedor externo

#### Scenario: Presentación de contenido editorial y datos
- **WHEN** una superficie combina una explicación continua con valores, estados o comandos
- **THEN** la explicación SHALL usar la familia de lectura y los elementos de datos SHALL usar la familia monoespaciada definida por sus tokens funcionales

#### Scenario: Variantes tipográficas reales
- **WHEN** una superficie presenta texto regular, enfatizado, cursivo o en negrita
- **THEN** SHALL usar variantes disponibles de la familia correspondiente sin sintetizar pesos o estilos inexistentes

### Requirement: Legibilidad por rol tipográfico
El sistema SHALL definir escala, peso, longitud de línea, interlineado y
espaciado según la función del texto, y SHALL conservar jerarquía y legibilidad
en móvil, tableta y escritorio.

#### Scenario: Lectura de una investigación extensa
- **WHEN** un usuario lee prosa continua en una investigación
- **THEN** el contenido SHALL usar la familia de lectura con una medida e interlineado apropiados para lectura prolongada

#### Scenario: Datos densos en una pantalla estrecha
- **WHEN** metadatos, controles o tablas usan la familia monoespaciada en móvil
- **THEN** su escala y composición SHALL conservar los valores completos sin provocar desplazamiento horizontal de la página

### Requirement: Jerarquía semántica de superficies
El sistema SHALL distinguir mediante tokens y variantes documentadas las
superficies base, estáticas, elevadas, interactivas, seleccionadas,
informativas, positivas y de advertencia.

#### Scenario: Panel informativo no interactivo
- **WHEN** una tarjeta o panel comunica contenido y no contiene una acción sobre toda su superficie
- **THEN** MUST NOT adoptar elevación, cursor o respuesta hover que implique que el panel completo es activable

#### Scenario: Superficie interactiva
- **WHEN** una superficie completa funciona como enlace, selección o control
- **THEN** SHALL exponer semántica accionable y estados visibles de hover, foco y activación

#### Scenario: Estado comunicado por una superficie
- **WHEN** una superficie representa selección, éxito, información o advertencia
- **THEN** SHALL combinar su token semántico con texto, icono, borde u otro indicador no exclusivamente cromático

### Requirement: Estados de interacción consistentes
Los controles y superficies accionables SHALL definir estados `default`,
`hover`, `focus-visible`, `active` y `disabled` cuando correspondan, y SHALL
mantener su significado con teclado y tecnologías de asistencia.

#### Scenario: Navegación mediante teclado
- **WHEN** un usuario desplaza el foco hacia una acción
- **THEN** el estado `focus-visible` SHALL ser perceptible, alcanzar el contraste aplicable y no quedar oculto por el estado hover

#### Scenario: Control deshabilitado
- **WHEN** una acción no está disponible
- **THEN** SHALL comunicar su estado visual y semánticamente y MUST NOT responder como una acción habilitada

#### Scenario: Preferencia de movimiento reducido
- **WHEN** el dispositivo indica `prefers-reduced-motion`
- **THEN** los cambios de estado SHALL conservarse sin animaciones o transiciones no esenciales

### Requirement: Iconografía SVG semántica
El sistema de diseño SHALL proporcionar un conjunto restringido de iconos SVG
inline procedentes de una librería versionada y SHALL aplicarlos de forma
consistente a estados, advertencias y enlaces de acción. Los iconos SHALL
heredar el color del contexto, usar tamaños y trazos documentados y MUST NOT
requerir solicitudes a proveedores externos durante la navegación.

#### Scenario: Renderizado estático de un icono
- **WHEN** una página Astro utiliza un icono aprobado por el sistema de diseño
- **THEN** la construcción SHALL incluir el SVG necesario en el HTML sin depender de JavaScript ni de una solicitud externa

#### Scenario: Estado acompañado por icono
- **WHEN** un badge, caveat o mensaje presenta un icono semántico
- **THEN** SHALL conservar una etiqueta textual que comunique el mismo significado sin depender del color o de la forma

#### Scenario: Icono junto a texto accesible
- **WHEN** un icono repite el significado de una etiqueta textual adyacente
- **THEN** SHALL ocultarse de las tecnologías de asistencia y MUST NOT recibir foco

#### Scenario: Control compuesto únicamente por un icono
- **WHEN** una interacción no contiene texto visible y usa un icono como único affordance
- **THEN** SHALL proporcionar un nombre accesible explícito que describa su acción

#### Scenario: Consulta de la gramática iconográfica
- **WHEN** un diseñador o desarrollador abre la página del sistema de diseño
- **THEN** SHALL encontrar el catálogo aprobado y sus reglas de tamaño, color, trazo, semántica y accesibilidad

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
