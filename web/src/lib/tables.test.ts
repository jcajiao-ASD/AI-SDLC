import { describe, expect, it } from 'vitest';
import type { ResearchDataset } from './types';
import {
	datasetTablePresentation,
	normalizeTablePresentation,
	parseTableDirectiveComment,
	validateMarkdownTableDirectives,
} from './tables';

describe('contrato de presentación de tablas', () => {
	it('resuelve encabezados con formato y protege el encabezado de fila', () => {
		const presentation = normalizeTablePresentation(
			['**Mejor LLM**', 'Por qué', 'Clave'],
			{
				rowHeader: 'Mejor LLM',
				essentialColumns: ['Por qué'],
				initiallyHiddenColumns: ['Clave'],
				contentKinds: { 'Mejor LLM': 'data', 'Por qué': 'prose' },
			},
			'ejemplo',
		);

		expect(presentation).toMatchObject({
			rowHeader: '**Mejor LLM**',
			essentialColumns: ['Por qué', '**Mejor LLM**'],
			initiallyHiddenColumns: ['Clave'],
			contentKinds: {
				'**Mejor LLM**': 'data',
				'Por qué': 'prose',
			},
		});
	});

	it('rechaza referencias inexistentes y conflictos de visibilidad', () => {
		expect(() =>
			normalizeTablePresentation(
				['Agente', 'Estado'],
				{ rowHeader: 'Herramienta' },
				'ejemplo',
			),
		).toThrow(/columna de tabla inválida/);
		expect(() =>
			normalizeTablePresentation(
				['Agente', 'Estado'],
				{
					essentialColumns: ['Estado'],
					initiallyHiddenColumns: ['Estado'],
				},
				'ejemplo',
			),
		).toThrow(/esencial e inicialmente oculta/);
	});

	it('aplica invariantes semánticas por esquema sin leer valores', () => {
		const dataset: ResearchDataset = {
			id: 'compatibility',
			schema: 'compatibility-matrix',
			unit: 'categorical',
			sourceFile: 'ejemplo.md',
			headers: [
				'Clave de agente',
				'Agente',
				'Clave de componente',
				'Componente',
				'Estado',
				'Mecanismo',
				'Nota',
				'Fuente',
				'Verificado el',
			],
			rows: [],
		};
		const presentation = datasetTablePresentation(dataset, {
			initiallyHiddenColumns: ['Clave de agente', 'Clave de componente'],
		});

		expect(presentation.rowHeader).toBe('Agente');
		expect(presentation.essentialColumns).toEqual([
			'Agente',
			'Componente',
			'Estado',
		]);
		expect(presentation.initiallyHiddenColumns).toEqual([
			'Clave de agente',
			'Clave de componente',
		]);
		expect(presentation.contentKinds.Nota).toBe('prose');
		expect(presentation.contentKinds['Verificado el']).toBe('data');
	});

	it('parsea JSON editorial y exige adyacencia con una tabla GFM', () => {
		const comment =
			'ai-sdlc-table: {"rowHeader":"Agente","essentialColumns":["Agente"]}';
		expect(parseTableDirectiveComment(comment)).toMatchObject({
			rowHeader: 'Agente',
			essentialColumns: ['Agente'],
		});
		const markdown = `<!-- ${comment} -->
| Agente | Estado |
| --- | --- |
| Copilot | nativa |`;
		expect(validateMarkdownTableDirectives(markdown, 'ejemplo.md')).toBe(1);
		expect(() =>
			validateMarkdownTableDirectives(
				`<!-- ${comment} -->

| Agente | Estado |
| --- | --- |
| Copilot | nativa |`,
				'ejemplo.md',
			),
		).toThrow(/debe preceder inmediatamente/);
	});
});
