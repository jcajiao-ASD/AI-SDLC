# Observatorio AI-SDLC

Frontend editorial estático para explorar las investigaciones de `../research/`
como catálogo, tres historias de decisión y un configurador transversal de stack.
Astro genera HTML para GitHub Pages;
Preact hidrata únicamente filtros y exploradores, y Observable Plot representa
datasets canónicos definidos dentro de los Markdown.

## Desarrollo local

```bash
npm install
npm run validate:content
npm run dev
```

Comprobación completa:

```bash
npm run verify
npx playwright install chromium
npm run test:e2e
```

Para simular GitHub Pages:

```bash
BASE_PATH=/AI-SDLC SITE_URL=https://usuario.github.io npm run build
```

## Tipografía

El observatorio usa Atkinson Hyperlegible Next Variable para interfaz, títulos y
prosa, y reserva JetBrains Mono Variable para datos, metadatos, etiquetas
técnicas y comandos. Las variantes normal e itálica se empaquetan desde
`@fontsource-variable/atkinson-hyperlegible-next` y
`@fontsource-variable/jetbrains-mono`; Astro publica los WOFF2 junto con los
demás assets, por lo que el sitio no solicita fuentes a proveedores externos.

## Contrato editorial

Cada archivo `research/*.md`, salvo `_index.md`, declara:

```yaml
---
id: identificador-estable
title: "Título"
slug: ruta-estable
summary: "Resumen ejecutivo"
category: agentes
status: vigente
cutoffDate: "2026-07-21"
revalidateAfter: "2027-01-21"
evidenceLevel: mixta
decisionType: comparacion-agentes
role: catalog
---
```

Valores permitidos:

- `category`: `agentes`, `modelos`, `seleccion`, `integraciones`,
  `metodologias`.
- `status`: `vigente`, `requiere-revalidacion`, `historico`.
- `evidenceLevel`: `alta`, `media`, `baja`, `mixta`.
- `role`: `catalog`, `featured-source`. Una fuente destacada también declara
  `featuredStory`; `relatedStories` permite añadir rutas secundarias como
  `configurador-stack`.

La construcción falla ante campos ausentes, fechas inválidas, slugs duplicados o
un estudio omitido.

## Datasets Markdown

Una visualización consume la misma tabla que funciona como fallback accesible:

```markdown
<!-- ai-sdlc-dataset: id=llm-global-ranking schema=weighted-ranking unit=score-100 -->
| Puesto | Modelo | Puntuación ponderada |
| --- | --- | ---: |
| 1 | Modelo A | 90 |
<!-- /ai-sdlc-dataset -->
```

No se mantienen copias JSON/YAML. Los identificadores, esquemas y columnas se
validan estrictamente. Si una historia cambia, debe actualizarse la tabla
canónica y conservar cerca sus caveats, unidad, fecha y fuentes.

Las reglas de selección usan claves técnicas y candidatos `rol:clave`, con roles
`primary`, `co-primary`, `alternative`, `pilot` y `none`. Las matrices
`compatibility-matrix` usan formato largo y registran agente, componente, estado,
mecanismo, nota, fuente y fecha. Sus estados válidos son `nativa`,
`condicionada`, `incompatible` y `no-confirmada`.

## Publicación y rollback

`observatory-ci.yml` valida pull requests. `observatory-pages.yml` construye y
publica `web/dist/` desde la rama principal. Para revertir, se puede desplegar
otra vez un commit anterior o deshabilitar temporalmente el workflow de Pages;
los Markdown continúan siendo legibles sin el frontend.

La persona que actualiza una investigación es responsable de mantener su
frontmatter, fecha de revalidación y datasets anotados en el mismo pull request.
