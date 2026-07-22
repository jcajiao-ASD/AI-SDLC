## ADDED Requirements

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

## MODIFIED Requirements

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

## REMOVED Requirements

### Requirement: Identidad tipográfica JetBrains Mono

**Reason**: La familia monoespaciada universal dificulta la lectura continua y
no diferencia adecuadamente interfaz, prosa y datos.

**Migration**: Sustituirla por `Sistema tipográfico híbrido`, conservando
JetBrains Mono para datos, metadatos, comandos y etiquetas técnicas.

### Requirement: Legibilidad con tipografía monoespaciada

**Reason**: La legibilidad deja de depender de adaptar todos los contenidos a
una única familia monoespaciada.

**Migration**: Usar `Legibilidad por rol tipográfico`, que define medidas y
composición según lectura, interfaz o datos.
