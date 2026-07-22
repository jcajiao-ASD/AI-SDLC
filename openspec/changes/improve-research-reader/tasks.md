## 1. Prerrequisito y outline

- [ ] 1.1 Confirmar que el contrato de breadcrumbs de `improve-site-navigation` está implementado o disponible para integración.
- [ ] 1.2 Extender el pipeline de investigación para devolver HTML y un outline con nivel, texto e identificador estable.
- [ ] 1.3 Añadir pruebas del outline para encabezados anidados, caracteres especiales, slugs duplicados y enlaces profundos.

## 2. Composición del lector

- [ ] 2.1 Crear el componente de tabla de contenido estática a partir del outline.
- [ ] 2.2 Refactorizar `[slug].astro` a la composición de índice, contenido y evidencia sin reducir la medida de lectura.
- [ ] 2.3 Reutilizar `EvidencePanel.astro` en el rail con metadatos, vigencia y destinos canónicos.
- [ ] 2.4 Integrar los breadcrumbs compartidos para Portada, Investigaciones y estudio actual.

## 3. Orientación progresiva

- [ ] 3.1 Implementar scroll-spy con una línea de activación estable y `aria-current` en el enlace de sección.
- [ ] 3.2 Implementar progreso de lectura con valor accesible, actualizaciones no intrusivas y movimiento reducido.
- [ ] 3.3 Compartir el offset de cabecera sticky con encabezados y navegación por hash.

## 4. Experiencia móvil

- [ ] 4.1 Convertir índice y evidencia en paneles nativos desplegables para pantallas estrechas.
- [ ] 4.2 Mantener conclusión y contenido principal próximos al encabezado y evitar paneles sticky que oculten foco.
- [ ] 4.3 Verificar que índice, evidencia, anclas y contenido completo funcionan sin JavaScript.

## 5. Validación

- [ ] 5.1 Añadir pruebas end-to-end de TOC, sección activa, progreso, hashes, breadcrumbs y subpath.
- [ ] 5.2 Añadir cobertura de teclado, movimiento reducido, móvil, no-JS, axe y ausencia de desbordamiento.
- [ ] 5.3 Ejecutar validación de contenido, Astro check, pruebas unitarias, build, enlaces y pruebas end-to-end.
