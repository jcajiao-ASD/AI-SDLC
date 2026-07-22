## Why

El configurador presenta tres controles, tres explicaciones y solo después el
resultado, lo que obliga a recorrer toda la interfaz para comprender el efecto
de una decisión. En móvil, la distancia entre entradas, conflictos y resultado
debilita la comparación.

## What Changes

- Presentar las tres dimensiones mediante un flujo progresivo de tres pasos sin
  volverlas dependientes ni impedir cambiar una selección anterior.
- Mantener un resumen compacto y visible del resultado mientras se recorren o
  ajustan las entradas.
- Acercar conflictos, condiciones y alternativas al componente que los origina,
  reutilizando los estados y roles canónicos existentes.
- Mejorar la composición móvil para conservar entradas, estado global,
  compatibilidad y fuentes dentro del mismo recorrido.
- Preservar resolución determinista, combinaciones co-primary, pilotos,
  alternativas, ausencia de framework y lenguaje no concluyente cuando no
  existe un stack verificable.
- Mantener en HTML estático las tres selecciones iniciales y un resultado
  completo idéntico al de la primera hidratación.

## Capabilities

### New Capabilities

Ninguna.

### Modified Capabilities

- `integrated-stack-recommendation`: amplía la experiencia de configuración y
  presentación del resultado sin cambiar las reglas canónicas de resolución.

## Impact

- `web/src/components/StackConfigurator.tsx` y sus estilos.
- `web/src/pages/historias/configurador-stack.astro`.
- Posibles componentes de pasos, resumen y detalle de compatibilidad.
- Pruebas unitarias y end-to-end de flujo, teclado, móvil, conflictos,
  alternativas, SSR y primera hidratación.
- No cambia `web/src/lib/stack.ts`, datasets Markdown ni matrices de
  compatibilidad salvo ajustes de interfaz estrictamente necesarios.
