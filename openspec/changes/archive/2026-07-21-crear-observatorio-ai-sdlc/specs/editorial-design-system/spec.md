## ADDED Requirements

### Requirement: Fundamentos visuales compartidos
El sistema SHALL definir tokens reutilizables para color, tipografía, espaciado,
grid, radios, elevación y movimiento, y SHALL usarlos en todas las superficies
del observatorio.

#### Scenario: Composición consistente
- **WHEN** una página del observatorio presenta contenido editorial o datos
- **THEN** sus estilos SHALL resolverse mediante los tokens y fundamentos compartidos

### Requirement: Dirección editorial tecnológica
El sistema SHALL presentar una identidad visual sobria, clara y orientada a
visualización de datos, con jerarquías que diferencien preguntas, conclusiones,
tradeoffs, caveats y evidencia.

#### Scenario: Lectura de una conclusión
- **WHEN** un usuario abre una historia de decisión
- **THEN** la conclusión ejecutiva SHALL distinguirse visual y semánticamente del detalle metodológico

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
