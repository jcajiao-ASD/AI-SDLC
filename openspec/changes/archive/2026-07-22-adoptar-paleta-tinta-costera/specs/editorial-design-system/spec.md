## ADDED Requirements

### Requirement: Identidad cromática Tinta Costera
El sistema SHALL usar `#12233F`, `#243B77`, `#2F7EA8`, `#CBEAF2` y
`#F7FBFF` como paleta de identidad compartida. SHALL reservar los tonos más
oscuros para texto, encabezados, navegación e interacciones que requieren alto
contraste; SHALL usar el teal para iconografía, gráficos y acentos; y SHALL usar
los tintes claros para fondos y separación de secciones.

#### Scenario: Aplicación de la paleta en una página
- **WHEN** una página renderiza navegación, contenido, acciones, gráficos y secciones
- **THEN** cada rol de identidad SHALL resolverse mediante un token semántico asociado a la paleta Tinta Costera

#### Scenario: Estado positivo sin verde
- **WHEN** un badge, resultado o mensaje comunica un estado positivo o verificado
- **THEN** SHALL usar la gama azul de Tinta Costera junto con texto, icono o borde identificable y MUST NOT depender de un verde

#### Scenario: Acento decorativo
- **WHEN** un elemento usa color únicamente para énfasis de marca
- **THEN** SHALL usar el teal `#2F7EA8` u otro rol de Tinta Costera y MUST NOT usar el naranja decorativo anterior

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

## MODIFIED Requirements

### Requirement: Dirección editorial tecnológica
El sistema SHALL presentar una identidad visual fresca, moderna, aireada y
orientada a visualización de datos, con profundidad índigo sin pesadez y con
jerarquías que diferencien preguntas, conclusiones, tradeoffs, caveats y
evidencia.

#### Scenario: Lectura de una conclusión
- **WHEN** un usuario abre una historia de decisión
- **THEN** la conclusión ejecutiva SHALL distinguirse visual y semánticamente del detalle metodológico mediante la gramática Tinta Costera compartida
