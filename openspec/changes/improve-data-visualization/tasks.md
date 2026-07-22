## 1. Prerrequisito y modelo

- [ ] 1.1 Confirmar que el contrato de claves y estados de fila de `improve-data-tables` está implementado.
- [ ] 1.2 Extender el modelo de visualización con clave estable, unidad, dominio, fecha de corte, confianza, fuente, caveat, selección y líder declarado.
- [ ] 1.3 Validar claves duplicadas, metadatos obligatorios y reglas que permiten declarar o derivar un líder.
- [ ] 1.4 Añadir pruebas unitarias para datasets comparables, series sin líder y metadatos inválidos.

## 2. Figura y jerarquía visual

- [ ] 2.1 Crear un contenedor de figura que presente título, descripción, unidad, corte, confianza, fuente y caveat.
- [ ] 2.2 Refactorizar `BarChart.tsx` para usar conjunto neutro, selección teal y líder índigo con indicadores no cromáticos.
- [ ] 2.3 Sustituir la etiqueta fija `Puntuación` por la unidad declarada y conservar etiquetas completas en móvil.
- [ ] 2.4 Respetar `prefers-reduced-motion` en carga y cambios de selección.

## 3. Estados y fallback

- [ ] 3.1 Implementar estados textuales de carga, vacío y error sin mostrar marcas parciales como resultado válido.
- [ ] 3.2 Mantener la tabla asociada disponible durante carga, vacío, error y ausencia de JavaScript.
- [ ] 3.3 Verificar que gráfica y tabla exponen los mismos valores, etiquetas y metadatos interpretativos.

## 4. Coordinación gráfica-tabla

- [ ] 4.1 Conectar marcas y filas mediante la clave estable del dataset.
- [ ] 4.2 Implementar selección bidireccional sin cambiar valores, ordenamientos ni recomendaciones.
- [ ] 4.3 Añadir navegación por teclado y anuncio accesible del dato seleccionado.
- [ ] 4.4 Integrar la coordinación en cada historia que use una visualización compatible.

## 5. Validación

- [ ] 5.1 Añadir pruebas end-to-end de líder, selección, metadatos, estados, teclado, móvil y movimiento reducido.
- [ ] 5.2 Añadir cobertura sin JavaScript, axe, equivalencia tabular y separación de datos no comparables.
- [ ] 5.3 Ejecutar validación de contenido, Astro check, pruebas unitarias, build, enlaces y pruebas end-to-end.
