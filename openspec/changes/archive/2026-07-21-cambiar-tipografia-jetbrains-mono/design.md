## Context

El observatorio define tres roles tipográficos en `tokens.css`: una sans serif
para interfaz, una serif para títulos y lectura extensa, y una monoespaciada para
datos y fragmentos técnicos. La aplicación de esos roles está distribuida entre
estilos globales, componentes Astro y páginas, y existen pesos entre `500` y
`900`.

El cambio adopta JetBrains Mono en todo el producto. Debe funcionar en la
construcción estática y bajo el subpath de GitHub Pages, sin solicitudes a
proveedores de fuentes durante la navegación. La prosa extensa, las tablas y los
títulos responsive son las superficies más sensibles al mayor ancho regular de
una fuente monoespaciada.

## Goals / Non-Goals

**Goals:**

- Presentar JetBrains Mono como identidad tipográfica única en todas las
  superficies.
- Empaquetar las variantes variables normal e itálica con el sitio.
- Conservar los roles semánticos actuales para evitar acoplar componentes a una
  familia concreta.
- Mantener legibilidad, jerarquía, accesibilidad y ausencia de desbordamiento en
  escritorio y móvil.
- Evitar pesos o estilos sintetizados que no pertenezcan a la familia.

**Non-Goals:**

- Rediseñar la paleta, los componentes o la gramática de visualización.
- Cambiar el contenido de las investigaciones.
- Introducir selección de fuente, temas tipográficos o preferencias por usuario.
- Cargar fuentes desde Google Fonts, JetBrains u otro servicio externo en tiempo
  de ejecución.

## Decisions

### 1. Empaquetar JetBrains Mono como dependencia local

Se incorporará la distribución variable de JetBrains Mono mediante un paquete
de fuentes compatible con el pipeline de Astro y fijado por `package-lock.json`.
Los estilos normal e itálico se importarán desde la aplicación para que Vite
emita los archivos WOFF2 con rutas compatibles con `BASE_PATH`.

Esto evita disponibilidad, privacidad y CSP dependientes de un CDN. Copiar
binarios manualmente a `public/` se descarta porque dificulta actualizar la
versión, rastrear la licencia y optimizar la construcción.

### 2. Conservar los tres tokens y unificarlos por debajo

`--font-sans`, `--font-serif` y `--font-mono` continuarán existiendo como roles
semánticos, pero resolverán a JetBrains Mono y una cadena monoespaciada de
respaldo. Así se obtiene una identidad uniforme sin reescribir cada consumidor y
se preserva la posibilidad de separar los roles en el futuro.

No se reemplazarán referencias individuales por el nombre literal de la fuente.

### 3. Usar los ejes variables dentro del rango real de la familia

Las variantes normal e itálica cubrirán los pesos `100` a `800`. Los usos
actuales de `850` y `900` se normalizarán a `800`; los demás pesos, incluidos
`750`, conservarán su valor cuando aporten una diferencia perceptible. Se
deshabilitará la síntesis tipográfica cuando sea viable para impedir negritas o
cursivas artificiales.

### 4. Recalibrar métricas, no solo sustituir el nombre

La medida de la prosa se reducirá desde los `74ch` actuales a un objetivo cercano
a `66ch`, sujeto a comprobación en contenido real. También se revisarán tracking,
line-height, escalas fluidas, botones, badges, navegación, tablas, ejes y títulos
largos. Los ajustes serán compartidos mediante tokens o reglas globales antes de
introducir excepciones locales.

La superficie del sistema de diseño documentará la familia, los estilos normal
e itálico y la escala de pesos usada.

### 5. Validar el resultado sobre las rutas representativas

La comprobación cubrirá portada, catálogo, un estudio largo, las tres historias
y el sistema de diseño en escritorio y móvil. Además de la construcción y las
pruebas existentes, se verificará que los assets de fuente se publiquen bajo el
subpath correcto, que no existan solicitudes externas y que no aparezca
desplazamiento horizontal de página.

## Risks / Trade-offs

- **La prosa monoespaciada puede cansar en lecturas largas** → Reducir medida,
  revisar interlineado y comprobar estudios extensos antes de aceptar el cambio.
- **Títulos y controles pueden ocupar más ancho** → Revisar puntos de quiebre y
  permitir wrapping sin reducir el tamaño por debajo de la escala accesible.
- **Dos variantes variables aumentan el peso inicial** → Incluir solo formatos y
  subconjuntos necesarios, y comprobar el tamaño emitido por la construcción.
- **El fallback cambia temporalmente la métrica durante la carga** → Usar
  `font-display: swap`, una pila monoespaciada compatible y evitar dimensiones
  rígidas dependientes del texto.
- **Pesos normalizados reducen contraste en algunos componentes** → Recuperar la
  jerarquía con tamaño, color y espaciado, no con pesos inexistentes.

## Migration Plan

1. Añadir la dependencia tipográfica y sus importaciones normal e itálica.
2. Unificar los tokens y normalizar pesos fuera de rango.
3. Ajustar métricas globales y luego corregir únicamente los desbordamientos
   demostrados en componentes o páginas.
4. Actualizar la muestra del sistema de diseño y ejecutar las validaciones.
5. Publicar mediante el workflow existente de GitHub Pages.

El rollback consiste en revertir la dependencia, las importaciones y los tokens
tipográficos; el contenido y los modelos de datos no requieren migración.

## Open Questions

Ninguna. El alcance y la estrategia de distribución quedaron definidos durante
la exploración.
