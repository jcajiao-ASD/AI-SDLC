import { describe, expect, it } from 'vitest';
import {
	assertNoEmojiPresentation,
	assertKnownStoryReferences,
	findEmojiPresentation,
	findDataset,
	findStudy,
	loadStudies,
	metadataSchema,
	parseDatasets,
	parseStudy,
	renderStudy,
	isPastRevalidation,
} from './research';
import { buildRankingVisualization } from './visualization';
import type { ResearchStudy } from './types';

function studyWithBody(body: string): ResearchStudy {
	return {
		fileName: 'ejemplo.md',
		filePath: '/tmp/ejemplo.md',
		metadata: {
			id: 'ejemplo',
			title: 'Documento de ejemplo',
			slug: 'ejemplo',
			summary: 'Resumen suficientemente largo para representar un estudio.',
			category: 'modelos',
			status: 'vigente',
			cutoffDate: '2026-07-22',
			revalidateAfter: '2027-01-01',
			evidenceLevel: 'media',
			decisionType: 'prueba',
			role: 'catalog',
		},
		body,
		datasets: [],
	};
}

describe('contrato editorial', () => {
	it('carga todo el corpus y el conjunto exacto de datasets canónicos', async () => {
		const studies = await loadStudies();
		expect(studies.length).toBeGreaterThan(0);
		expect(studies.map((study) => study.metadata.slug)).toContain(
			'configuracion-openspec-yaml',
		);
		expect(
			studies
				.flatMap((study) => study.datasets)
				.map(({ id }) => id)
				.sort(),
		).toEqual([
			'agent-candidate-matrix',
			'agent-framework-compatibility',
			'agent-model-compatibility',
			'agent-profile-recommendations',
			'framework-adoption-ranking',
			'framework-profile-recommendations',
			'framework-quality-ranking',
			'framework-sensitivity',
			'llm-global-ranking',
			'llm-sdlc-map',
		]);
	});

	it('rechaza metadatos incompletos con el campo localizado', () => {
		const result = metadataSchema.safeParse({ title: 'Documento incompleto' });
		expect(result.success).toBe(false);
		if (!result.success) {
			expect(result.error.issues.some((issue) => issue.path[0] === 'slug')).toBe(true);
		}
	});

	it('rechaza una tabla anotada incompatible con su esquema', () => {
		const markdown = `<!-- ai-sdlc-dataset: id=bad schema=weighted-ranking unit=score-100 -->
| Nombre | Valor |
| --- | --- |
| A | 1 |
<!-- /ai-sdlc-dataset -->`;
		expect(() => parseDatasets(markdown, 'bad.md')).toThrow(/falta una columna/);
	});

	it('rechaza roles, claves y reglas sin candidato principal', () => {
		const table = (candidates: string) => `<!-- ai-sdlc-dataset: id=bad schema=profile-recommendation unit=categorical -->
| Clave de contexto | Perfil | Candidatos | Herramienta | Motivo | Caveat |
| --- | --- | --- | --- | --- | --- |
| contexto | Perfil válido | ${candidates} | Herramienta válida | Motivo suficientemente explícito | Caveat suficientemente explícito |
<!-- /ai-sdlc-dataset -->`;

		expect(() => parseDatasets(table('winner:tool'), 'bad.md')).toThrow(
			/rol de candidato inválido/,
		);
		expect(() => parseDatasets(table('primary:Clave_Mala'), 'bad.md')).toThrow(
			/clave de candidato inválida/,
		);
		expect(() => parseDatasets(table('alternative:tool'), 'bad.md')).toThrow(
			/no contiene candidato principal/,
		);
	});

	it('rechaza estados, parejas duplicadas y procedencia ausente', () => {
		const compatibility = (rows: string) => `<!-- ai-sdlc-dataset: id=bad schema=compatibility-matrix unit=categorical -->
| Clave de agente | Agente | Clave de componente | Componente | Estado | Mecanismo | Nota | Fuente | Verificado el |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
${rows}
<!-- /ai-sdlc-dataset -->`;
		const validRow =
			'| agent | Agent | component | Component | nativa | Directa | Nota | https://example.com | 2026-07-22 |';

		expect(() =>
			parseDatasets(
				compatibility(validRow.replace('nativa', 'desconocida')),
				'bad.md',
			),
		).toThrow(/estado de compatibilidad inválido/);
		expect(() =>
			parseDatasets(compatibility(`${validRow}\n${validRow}`), 'bad.md'),
		).toThrow(/relación duplicada/);
		expect(() =>
			parseDatasets(
				compatibility(validRow.replace('https://example.com', '')),
				'bad.md',
			),
		).toThrow(/carece de mecanismo, nota o fuente/);
	});

	it('rechaza historias relacionadas duplicadas o inexistentes', async () => {
		const studies = await loadStudies();
		const metadata = studies[0].metadata;
		expect(
			metadataSchema.safeParse({
				...metadata,
				relatedStories: ['configurador-stack', 'configurador-stack'],
			}).success,
		).toBe(false);
		expect(() =>
			assertKnownStoryReferences(
				{ ...metadata, relatedStories: ['historia-inexistente'] },
				'ejemplo.md',
			),
		).toThrow(/historia relacionada inexistente/);
	});

	it('rechaza un estudio cuya fecha solo aparece en la prosa', () => {
		const source = `---
id: ejemplo
title: "Documento de ejemplo completo"
slug: ejemplo
summary: "Resumen suficientemente largo para probar el contrato editorial."
category: modelos
status: vigente
revalidateAfter: "2027-01-01"
evidenceLevel: media
decisionType: prueba
role: catalog
---

Corte: 2026-01-01`;
		expect(() => parseStudy('ejemplo.md', '/tmp/ejemplo.md', source)).toThrow(/cutoffDate/);
	});

	it('deriva tabla y serie gráfica del mismo dataset Markdown', async () => {
		const studies = await loadStudies();
		const dataset = findDataset(studies, 'llm-global-ranking');
		const source = findStudy(studies, 'comparativa-llms-sdlc');
		const model = buildRankingVisualization(dataset, source, {
			title: 'Ranking ponderado de LLMs',
			description: 'Descripción de prueba.',
			caveat: 'Caveat de prueba.',
		});
		expect(model.data).toHaveLength(dataset.rows.length);
		expect(model.data[0]).toMatchObject({ label: 'GPT-5.6 Sol', value: 88.5 });
	});

	it('conserva el dataset al insertar metadata de presentación', () => {
		const plain = `<!-- ai-sdlc-dataset: id=ranking schema=weighted-ranking unit=score-100 -->
| Puesto | Modelo | Puntuación |
| --- | --- | --- |
| 1 | Sol | 90 |
<!-- /ai-sdlc-dataset -->`;
		const annotated = plain.replace(
			'| Puesto',
			'<!-- ai-sdlc-table: {"rowHeader":"Modelo","essentialColumns":["Puesto","Modelo","Puntuación"]} -->\n| Puesto',
		);
		expect(parseDatasets(annotated, 'ejemplo.md')).toEqual(
			parseDatasets(plain, 'ejemplo.md'),
		);
	});

	it('renderiza filas semánticas y resumen móvil conservando markup inline', async () => {
		const study = studyWithBody(`## Compatibilidad

<!-- ai-sdlc-table: {"rowHeader":"Agente","essentialColumns":["Agente","Estado"],"initiallyHiddenColumns":["Clave"],"summaryColumns":["Estado"],"contentKinds":{"Agente":"data","Estado":"data","Nota":"prose"}} -->
| Clave | Agente | Estado | Nota | Fuente |
| --- | --- | --- | --- | --- |
| copilot | **Copilot CLI** | <span id="estado-prueba">nativa</span> | Nota *editorial* | [Fuente](https://example.com) |`);
		const html = await renderStudy(study, [study]);

		expect(html).toContain('data-table-frame');
		expect(html).toContain('scope="row"');
		expect(html).toContain('table-column-picker');
		expect(html).toContain('table-mobile');
		expect(html).toContain('<em>editorial</em>');
		expect(html.match(/href="https:\/\/example\.com"/g)).toHaveLength(2);
		expect(html.match(/id="estado-prueba"/g)).toHaveLength(1);
		expect(html).not.toContain('ai-sdlc-table');
	});

	it('degrada una tabla amplia sin metadata a scroll etiquetado', async () => {
		const study = studyWithBody(`## Matriz abierta

| A | B | C | D | E |
| --- | --- | --- | --- | --- |
| 1 | 2 | 3 | 4 | 5 |`);
		const html = await renderStudy(study, [study]);

		expect(html).toContain('table-frame--wide');
		expect(html).toContain('role="region"');
		expect(html).toContain('Tabla 1 de la sección Matriz abierta');
		expect(html).not.toContain('table-column-picker');
		expect(html).not.toContain('table-mobile');
		expect(html).not.toContain('scope="row"');
	});

	it('marca una investigación cuando supera su fecha de revalidación', async () => {
		const studies = await loadStudies();
		expect(
			isPastRevalidation(studies[0].metadata, new Date('2027-02-01T00:00:00Z')),
		).toBe(true);
	});

	it('rechaza presentación emoji e identifica el archivo', () => {
		expect(() =>
			assertNoEmojiPresentation('Estado ✅ y advertencia', 'ejemplo.md'),
		).toThrow(/ejemplo\.md.*✅/);
		expect(findEmojiPresentation('Advertencia ⚠️')).toBe('⚠️');
		expect(findEmojiPresentation(`Selector huérfano \uFE0F`)).toBe('\uFE0F');
	});

	it('acepta símbolos técnicos, dígitos y sintaxis Markdown', () => {
		const source = 'Flujo A → B; límite ≤ 5; 3 × 4 ≈ 12; Σ(x); **valor #7**';
		expect(findEmojiPresentation(source)).toBeUndefined();
		expect(() =>
			assertNoEmojiPresentation(source, 'tecnico.md'),
		).not.toThrow();
	});
});
