## Context

La interfaz concentra la mayor parte de su color en
`web/src/styles/tokens.css`, pero conserva valores verdes directos en el
degradado global, gráficos, resúmenes ejecutivos, badges y escalas. El encabezado
también replica directamente el fondo cálido actual. La migración debe abarcar
estos puntos para evitar una identidad parcialmente verde.

La paleta objetivo es:

| Rol visual | Color |
|---|---|
| Índigo profundo | `#12233F` |
| Índigo interactivo | `#243B77` |
| Teal de acento | `#2F7EA8` |
| Aqua pálido | `#CBEAF2` |
| Blanco costero | `#F7FBFF` |

El contraste condiciona la asignación: `#2F7EA8` alcanza aproximadamente
4.32:1 sobre `#F7FBFF`, por lo que no es una elección segura para texto normal
AA. `#243B77` y `#12233F` sí proporcionan margen suficiente sobre los fondos
claros.

## Goals / Non-Goals

**Goals:**

- Reemplazar toda presencia verde de identidad y de estado positivo.
- Centralizar la nueva paleta en tokens semánticos reutilizables.
- Extender la migración a colores directos para que no queden residuos verdes.
- Conservar jerarquía, legibilidad, semántica y accesibilidad WCAG 2.2 AA.
- Documentar la paleta y sus usos en `/sistema-diseno/`.

**Non-Goals:**

- Rediseñar tipografía, espaciado, composición o componentes.
- Cambiar el contenido editorial, las recomendaciones o los datasets.
- Eliminar el ámbar de advertencias que comunica una semántica distinta.
- Incorporar dependencias, temas alternativos o selección de tema por usuario.

## Decisions

### 1. Mapear la paleta mediante roles semánticos

Los tokens principales se reasignarán de esta forma:

| Token o función | Asignación |
|---|---|
| Texto principal y superficies oscuras | `#12233F` |
| Texto secundario, enlaces, botones y éxito | `#243B77` |
| Acentos, iconos, gráficos y foco | `#2F7EA8` |
| Fondos destacados y separadores amplios | `#CBEAF2` |
| Fondo de página | `#F7FBFF` |

Los bordes suaves podrán usar una transparencia derivada de `#2F7EA8`, mientras
que controles y estados que necesiten contraste no textual usarán una variante
más fuerte. El blanco puro existente podrá mantenerse en tarjetas cuando sea
necesario distinguirlas del lienzo sin introducir otro matiz de marca.

**Alternativa considerada:** reemplazar valores hexadecimales uno a uno. Se
descarta porque perpetuaría colores directos y no reflejaría que teal, índigo y
aqua tienen funciones diferentes.

### 2. Reservar el teal para acentos y elementos no textuales

`#2F7EA8` se usará en barras, iconos, foco, contornos relevantes y énfasis
decorativo. El texto normal interactivo utilizará `#243B77` o `#12233F`, debido
al contraste insuficiente del teal sobre `#F7FBFF`.

**Alternativa considerada:** usar teal como color principal de enlaces y botones.
Se descarta porque deja combinaciones en el límite o por debajo de WCAG AA.

### 3. Representar el éxito dentro de la gama azul

Los badges y resultados verificados usarán índigo para texto y borde, aqua para
el fondo y conservarán iconos, etiquetas y clases de estado. La semántica seguirá
siendo explícita aunque desaparezca la convención verde.

**Alternativa considerada:** conservar verde únicamente para éxito. Se descarta
por decisión de alcance: la experiencia no debe mostrar ningún verde.

### 4. Conservar advertencias semánticas, no el naranja decorativo

Los tokens y componentes de advertencia mantendrán su gama ámbar porque expresan
riesgo y no pertenecen a la identidad verde reemplazada. El token de acento
decorativo actual pasará a teal, evitando un sexto color de marca.

### 5. Eliminar duplicaciones cromáticas directas

El gráfico de barras, el resumen ejecutivo, badges, fondo del encabezado,
degradado de página, bloques de código y primer segmento de sensibilidad deberán
consumir tokens o valores derivados de la nueva paleta. La página del sistema de
diseño mostrará las cinco muestras y explicará sus roles.

## Risks / Trade-offs

- **[Riesgo] El aqua puede reducir demasiado la separación entre superficies.**
  → Usar bordes teal con intensidad suficiente donde el límite sea funcional.
- **[Riesgo] El teal puede fallar contraste como texto normal.**
  → Restringirlo a usos gráficos o de texto grande y validar combinaciones AA.
- **[Riesgo] El éxito azul puede confundirse con información.**
  → Mantener icono de verificación, etiqueta textual y diferencias de borde o
  fondo entre los tonos `success` e `info`.
- **[Riesgo] Pueden quedar verdes incrustados fuera de los tokens.**
  → Buscar todos los hexadecimales, RGB y nombres de color en `web/src` antes de
  cerrar la implementación.
- **[Trade-off] La paleta monocromática reduce variedad semántica.**
  → Preservar ámbar para advertencias y apoyarse en iconografía y texto para los
  demás estados.

## Migration Plan

1. Reasignar y, si hace falta, ampliar los tokens cromáticos compartidos.
2. Sustituir colores directos verdes y decorativos en estilos y componentes.
3. Actualizar gráficos, badges, resúmenes y estados positivos.
4. Actualizar la documentación y muestras de `/sistema-diseno/`.
5. Añadir comprobaciones automatizadas de tokens, ausencia de verde y contraste
   en las superficies principales.
6. Ejecutar las validaciones web y OpenSpec existentes.

La reversión consiste en restaurar la asignación anterior de tokens y valores
directos; no hay migración de datos ni cambios incompatibles.

## Open Questions

Ninguna. La eliminación total del verde y la conservación del ámbar semántico
quedaron resueltas durante la exploración.
