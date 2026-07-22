## 1. Estructura de presentación

- [ ] 1.1 Separar componentes de paso, resumen, capa y detalle sin modificar `resolveStack` ni sus tipos canónicos.
- [ ] 1.2 Renderizar contexto del agente, fase/modelo y escenario de proceso como tres pasos reales y directamente editables.
- [ ] 1.3 Mantener visibles las selecciones actuales y permitir cambiar cualquier paso sin reiniciar los demás.

## 2. Resumen y resultado

- [ ] 2.1 Crear un resumen de agente, modelo, framework o ausencia de framework y estado global derivado de `StackResolution`.
- [ ] 2.2 Mantener el resumen dentro del recorrido en escritorio y ubicar una variante compacta no obstructiva en móvil.
- [ ] 2.3 Garantizar que resumen y detalle muestran las mismas combinaciones, condiciones y lenguaje de recomendación.

## 3. Conflictos y alternativas

- [ ] 3.1 Mostrar incompatibilidades y estados no confirmados junto al paso o capa afectada.
- [ ] 3.2 Conservar mecanismo, nota, fecha y fuente en el detalle global de cada relación.
- [ ] 3.3 Presentar alternativas con roles y compatibilidades existentes sin inventar severidades o rankings.
- [ ] 3.4 Mantener tratamientos explícitos para co-primary, pilot, alternative y none.

## 4. SSR, hidratación y accesibilidad

- [ ] 4.1 Renderizar en HTML estático los tres pasos, capas, resumen, resultado, conflictos y alternativas iniciales.
- [ ] 4.2 Hidratar desde los mismos valores SSR y conservar igualdad antes de la primera interacción.
- [ ] 4.3 Implementar anuncios concentrados del estado global y conflicto principal sin mover el foco.
- [ ] 4.4 Ajustar teclado, foco visible, responsive y ausencia de scroll horizontal.

## 5. Validación

- [ ] 5.1 Ampliar pruebas unitarias de presentación para estados verificado, condicionado, incompatible, no confirmado, piloto y sin framework.
- [ ] 5.2 Añadir pruebas end-to-end del flujo, edición fuera de orden, resumen, conflictos, alternativas, móvil, no-JS y paridad SSR.
- [ ] 5.3 Ejecutar validación de contenido, Astro check, pruebas unitarias, build, enlaces y pruebas end-to-end.
