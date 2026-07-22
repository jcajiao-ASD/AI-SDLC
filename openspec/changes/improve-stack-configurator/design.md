## Context

`StackConfigurator.tsx` renderiza tres selects en paralelo, tres tarjetas de capa
y un bloque de resultado. La resolución determinista, los roles de candidatos,
las matrices de compatibilidad y la paridad SSR ya están cubiertos; el problema
es la secuencia de comprensión y la distancia visual entre una entrada y su
efecto.

El diseño debe mejorar el flujo sin convertir dimensiones independientes en un
wizard obligatorio ni crear un segundo modelo de conflictos.

## Goals / Non-Goals

**Goals:**

- Guiar las tres decisiones en una secuencia comprensible.
- Mantener selecciones anteriores visibles y editables.
- Conservar un resumen de resultado próximo a los controles.
- Acercar condiciones, conflictos y alternativas a la capa afectada.
- Preservar lógica determinista, SSR, no-JS y accesibilidad.

**Non-Goals:**

- Cambiar `resolveStack` o las matrices canónicas.
- Introducir una puntuación global o ranking de stacks.
- Persistir configuraciones en cuentas, servidor o almacenamiento remoto.
- Rediseñar las historias especializadas.

## Decisions

### 1. Flujo progresivo, no wizard bloqueante

Las entradas se presentarán como tres pasos numerados porque representan una
secuencia real de composición: contexto del agente, fase/modelo y escenario de
proceso. Completar un paso revelará o enfatizará el siguiente, pero los tres
valores permanecerán visibles en un resumen y cualquier paso podrá editarse.

No existirán botones `Siguiente` que impidan cambiar dimensiones fuera de orden.

### 2. Resumen persistente del stack

En escritorio, un rail de resultado permanecerá visible dentro de la sección; en
móvil, un resumen compacto precederá el detalle y enlazará al resultado completo.
Mostrará las tres capas y el estado global sin ocultar caveats.

El resumen no duplicará la lógica: consumirá el mismo `StackResolution`.

### 3. Feedback local por capa

Cada paso mostrará recomendación, motivo, caveat y fuente de su opción actual.
Cuando una relación sea incompatible o no confirmada, el paso del componente
conflictivo mostrará el estado y el mecanismo aplicable, mientras el detalle
global conservará todas las relaciones.

### 4. Alternativas con vocabulario existente

Las alternativas se presentarán según `primary`, `co-primary`, `alternative`,
`pilot` y `none`, y según los estados `nativa`, `condicionada`, `incompatible` y
`no-confirmada`. La interfaz no introducirá severidades o rankings paralelos.

### 5. HTML estático completo

La respuesta del servidor renderizará los tres controles iniciales, las tres
capas y el resultado completo. La hidratación convertirá la presentación en
flujo progresivo y resumen sticky sin cambiar el primer resultado.

Sin JavaScript no habrá pasos colapsados que oculten información.

### 6. Anuncios concentrados

Los cambios de selección actualizarán una región live atómica con el estado
global y el conflicto principal. El detalle completo no se anunciará en cada
cambio para evitar ruido. El foco permanecerá en el control usado.

### 7. Firma visual: ensamblaje verificable

Los tres pasos se conectarán mediante una línea de ensamblaje que desemboca en el
estado de compatibilidad. Es la aplicación del recorrido
`Pregunta → Recomendación → Condición → Evidencia → Fuente`; no se usarán tres
tarjetas equivalentes aisladas.

## Risks / Trade-offs

- **[Wizard accidental]** ocultar pasos puede romper independencia → mantener
  siempre visible el resumen y permitir edición directa de cualquier dimensión.
- **[Resultado sticky invasivo]** puede reducir espacio o cubrir contenido →
  limitarlo a su contenedor y usar resumen no sticky en pantallas pequeñas.
- **[Mensajes duplicados]** feedback local y global pueden contradecirse →
  derivar ambos del mismo objeto de resolución.
- **[Anuncios excesivos]** cada cambio produce mucho texto → anunciar solo estado
  y conflicto principal, manteniendo el detalle consultable.
- **[Paridad SSR rota]** la interfaz progresiva podría seleccionar defaults
  distintos → hidratar desde los mismos valores renderizados y conservar pruebas
  de igualdad.

## Migration Plan

1. Separar presentación de pasos, capas y resumen sin tocar el resolver.
2. Renderizar el nuevo flujo en SSR con las selecciones actuales.
3. Añadir progresión, edición directa y resumen responsive.
4. Integrar feedback local, conflictos y alternativas.
5. Actualizar pruebas de semántica, paridad, teclado, móvil y no-JS.

El rollback restaura la disposición paralela; el contrato de datos y el resolver
no cambian.

## Open Questions

Ninguna. La implementación podrá elegir acordeón o stepper siempre que conserve
las tres dimensiones visibles, editables e independientes.
