import { describe, expect, it } from 'vitest';
import type { ResearchDataset, ResearchMetadata, ResearchStudy } from './types';
import { findDataset, findStudy, loadStudies } from './research';
import { buildRankingVisualization } from './visualization';

function metadata(overrides: Partial<ResearchMetadata> = {}): ResearchMetadata {
	return {
		id: 'ejemplo',
		title: 'Estudio de ejemplo',
		slug: 'estudio-ejemplo',
		summary: 'Resumen suficientemente largo para pasar la validación de contenido.',
		category: 'modelos',
		status: 'vigente',
		cutoffDate: '2026-07-01',
		revalidateAfter: '2027-01-01',
		evidenceLevel: 'media',
		decisionType: 'seleccion-modelo',
		role: 'catalog',
		...overrides,
	};
}

function study(dataset: ResearchDataset, overrides: Partial<ResearchMetadata> = {}): ResearchStudy {
	return {
		fileName: 'ejemplo.md',
		filePath: '/ejemplo.md',
		metadata: metadata(overrides),
		body: '',
		datasets: [dataset],
	};
}

function rankingDataset(
	rows: Record<string, string>[],
	overrides: Partial<ResearchDataset> = {},
): ResearchDataset {
	return {
		id: 'ejemplo-ranking',
		schema: 'weighted-ranking',
		unit: 'score-100',
		sourceFile: 'ejemplo.md',
		headers: ['Puesto', 'Modelo', 'Puntuación ponderada'],
		rows,
		...overrides,
	};
}

describe('contrato de visualización de rankings', () => {
	it('construye el modelo a partir de un dataset comparable real', async () => {
		const studies = await loadStudies();
		const dataset = findDataset(studies, 'llm-global-ranking');
		const source = findStudy(studies, 'comparativa-llms-sdlc');
		const model = buildRankingVisualization(dataset, source, {
			title: 'Ranking ponderado de LLMs',
			description: 'GPT-5.6 Sol lidera el perfil equilibrado.',
			caveat: 'Modelo ordinal ponderado; no representa porcentaje de rendimiento.',
		});

		expect(model.groupId).toBe('llm-global-ranking');
		expect(model.unit).toBe('Puntuación / 100');
		expect(model.cutoffDate).toBe(source.metadata.cutoffDate);
		expect(model.confidence).toBe('Confianza mixta');
		expect(model.source).toEqual({
			label: source.metadata.title,
			href: '/investigaciones/comparativa-llms-sdlc/',
		});
		expect(model.data[0]).toMatchObject({
			key: 'gpt-5-6-sol',
			label: 'GPT-5.6 Sol',
			value: 88.5,
			isLeader: true,
		});
		expect(model.data.filter((datum) => datum.isLeader)).toHaveLength(1);
		expect(model.data.map((datum) => datum.value)).toEqual(
			[...model.data.map((datum) => datum.value)].sort((a, b) => b - a),
		);
	});

	it('rechaza combinar datasets no comparables en una misma visualización', () => {
		const incompatibleDataset: ResearchDataset = {
			id: 'ejemplo-incompatible',
			schema: 'sensitivity-series',
			unit: 'percent-weight',
			sourceFile: 'ejemplo.md',
			headers: ['Peso agregado', 'Líder'],
			rows: [{ 'Peso agregado': '0-33', Líder: 'GSD Core' }],
		};

		expect(() =>
			buildRankingVisualization(incompatibleDataset, study(incompatibleDataset), {
				title: 'Ranking',
				description: 'Descripción',
				caveat: 'Caveat',
			}),
		).toThrow(/se esperaba el esquema weighted-ranking/);
	});

	it('rechaza una serie sin ninguna fila declarada como puesto 1', () => {
		const dataset = rankingDataset([
			{ Puesto: '2.º', Modelo: 'Modelo A', 'Puntuación ponderada': '80' },
			{ Puesto: '3.º', Modelo: 'Modelo B', 'Puntuación ponderada': '70' },
		]);

		expect(() =>
			buildRankingVisualization(dataset, study(dataset), {
				title: 'Ranking',
				description: 'Descripción',
				caveat: 'Caveat',
			}),
		).toThrow(/ninguna fila declara el puesto 1/);
	});

	it('rechaza metadatos inválidos: caveat ausente, unidad desconocida y claves duplicadas', () => {
		const dataset = rankingDataset([
			{ Puesto: '1.º', Modelo: 'Modelo A', 'Puntuación ponderada': '90' },
		]);

		expect(() =>
			buildRankingVisualization(dataset, study(dataset), {
				title: 'Ranking',
				description: 'Descripción',
				caveat: '   ',
			}),
		).toThrow(/falta el caveat editorial/);

		const unknownUnitDataset = rankingDataset(
			[{ Puesto: '1.º', Modelo: 'Modelo A', 'Puntuación ponderada': '90' }],
			{ unit: 'unidad-inexistente' },
		);
		expect(() =>
			buildRankingVisualization(unknownUnitDataset, study(unknownUnitDataset), {
				title: 'Ranking',
				description: 'Descripción',
				caveat: 'Caveat',
			}),
		).toThrow(/unidad sin etiqueta declarada/);

		const duplicateKeyDataset = rankingDataset([
			{ Puesto: '1.º', Modelo: 'Modelo A', 'Puntuación ponderada': '90' },
			{ Puesto: '2.º', Modelo: 'Modelo A', 'Puntuación ponderada': '70' },
		]);
		expect(() =>
			buildRankingVisualization(duplicateKeyDataset, study(duplicateKeyDataset), {
				title: 'Ranking',
				description: 'Descripción',
				caveat: 'Caveat',
			}),
		).toThrow(/clave de coordinación duplicada/);
	});
});
