import { describe, expect, it } from 'vitest';
import {
	findDataset,
	loadStudies,
	metadataSchema,
	parseDatasets,
	parseStudy,
	isPastRevalidation,
} from './research';
import { rankingBars } from './datasets';

describe('contrato editorial', () => {
	it('carga exactamente los trece estudios y siete datasets canónicos', async () => {
		const studies = await loadStudies();
		expect(studies).toHaveLength(13);
		expect(studies.flatMap((study) => study.datasets)).toHaveLength(7);
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
		const bars = rankingBars(dataset);
		expect(bars).toHaveLength(dataset.rows.length);
		expect(bars[0]).toMatchObject({ label: 'GPT-5.6 Sol', value: 88.5 });
	});

	it('marca una investigación cuando supera su fecha de revalidación', async () => {
		const studies = await loadStudies();
		expect(
			isPastRevalidation(studies[0].metadata, new Date('2027-02-01T00:00:00Z')),
		).toBe(true);
	});
});
