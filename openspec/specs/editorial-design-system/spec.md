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
