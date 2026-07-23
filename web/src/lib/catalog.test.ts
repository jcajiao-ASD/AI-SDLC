import { describe, expect, it } from 'vitest';
import {
	applyCatalogState,
	catalogFacetValues,
	defaultCatalogState,
	filterCatalogItems,
	isDefaultCatalogState,
	parseCatalogSearch,
	serializeCatalogSearch,
	sortCatalogItems,
	type CatalogItem,
	type CatalogState,
} from './catalog';

function item(overrides: Partial<CatalogItem> & { id: string }): CatalogItem {
	return {
		title: `Estudio ${overrides.id}`,
		summary: 'Resumen suficientemente largo para pruebas de catálogo.',
		category: 'modelos',
		status: 'vigente',
		year: '2026',
		decisionType: 'adopcion',
		cutoffDate: '2026-01-01',
		href: `/investigaciones/${overrides.id}/`,
		...overrides,
	};
}

function state(overrides: Partial<CatalogState> = {}): CatalogState {
	return { ...defaultCatalogState(), ...overrides };
}

describe('filterCatalogItems', () => {
	it('ignora mayúsculas y diacríticos al comparar la consulta', () => {
		const items = [
			item({ id: 'agentes', title: 'Selección de Agéntes en Español' }),
			item({ id: 'modelos', title: 'Comparativa de modelos' }),
		];
		expect(filterCatalogItems(items, state({ q: 'AGENTES' })).map((i) => i.id)).toEqual([
			'agentes',
		]);
		expect(filterCatalogItems(items, state({ q: 'agéntes' })).map((i) => i.id)).toEqual([
			'agentes',
		]);
	});

	it('combina filtros exactos con la búsqueda textual', () => {
		const items = [
			item({ id: 'a', category: 'modelos', title: 'Rendimiento de modelos' }),
			item({ id: 'b', category: 'agentes', title: 'Rendimiento de agentes' }),
		];
		const result = filterCatalogItems(items, state({ category: 'modelos', q: 'rendimiento' }));
		expect(result.map((i) => i.id)).toEqual(['a']);
	});

	it('no produce coincidencias cuando ningún criterio aplica', () => {
		const items = [item({ id: 'a' })];
		expect(filterCatalogItems(items, state({ q: 'inexistente' }))).toEqual([]);
	});
});

describe('sortCatalogItems', () => {
	it('ordena por fecha de corte descendente y resuelve empates por título e id', () => {
		const items = [
			item({ id: 'z', title: 'Zeta', cutoffDate: '2026-06-01' }),
			item({ id: 'b', title: 'Beta', cutoffDate: '2026-06-01' }),
			item({ id: 'a', title: 'Alfa', cutoffDate: '2026-07-01' }),
		];
		expect(sortCatalogItems(items, state({ sort: 'fecha' })).map((i) => i.id)).toEqual([
			'a',
			'b',
			'z',
		]);
	});

	it('ordena por título ascendente en español y resuelve empates por id', () => {
		const items = [
			item({ id: '2', title: 'Ébano' }),
			item({ id: '1', title: 'Acero' }),
			item({ id: '3', title: 'Acero' }),
		];
		const sorted = sortCatalogItems(items, state({ sort: 'titulo' })).map((i) => i.id);
		expect(sorted).toEqual(['1', '3', '2']);
	});

	it('prioriza coincidencias de título sobre resumen y metadatos en relevancia', () => {
		const items = [
			item({ id: 'meta', title: 'Sin coincidencia directa', decisionType: 'framework-elegido' }),
			item({ id: 'summary', title: 'Otro título', summary: 'Contiene framework en el resumen' }),
			item({ id: 'title', title: 'Framework recomendado' }),
		];
		const sorted = sortCatalogItems(items, state({ q: 'framework' })).map((i) => i.id);
		expect(sorted).toEqual(['title', 'summary', 'meta']);
	});

	it('no inventa un orden de relevancia sin consulta activa y usa el orden predeterminado', () => {
		const items = [
			item({ id: 'old', title: 'Zeta', cutoffDate: '2026-01-01' }),
			item({ id: 'new', title: 'Alfa', cutoffDate: '2026-06-01' }),
		];
		expect(sortCatalogItems(items, state({ sort: 'relevancia' })).map((i) => i.id)).toEqual([
			'new',
			'old',
		]);
	});
});

describe('applyCatalogState', () => {
	it('filtra y luego ordena de forma determinista', () => {
		const items = [
			item({ id: 'a', category: 'modelos', title: 'Zeta', cutoffDate: '2026-01-01' }),
			item({ id: 'b', category: 'modelos', title: 'Alfa', cutoffDate: '2026-06-01' }),
			item({ id: 'c', category: 'agentes', title: 'Beta', cutoffDate: '2026-09-01' }),
		];
		expect(
			applyCatalogState(items, state({ category: 'modelos', sort: 'fecha' })).map((i) => i.id),
		).toEqual(['b', 'a']);
	});
});

describe('catalogFacetValues', () => {
	it('deduplica y ordena valores en español', () => {
		const items = [
			item({ id: 'a', category: 'metodologias' }),
			item({ id: 'b', category: 'agentes' }),
			item({ id: 'c', category: 'agentes' }),
		];
		expect(catalogFacetValues(items, 'category')).toEqual(['agentes', 'metodologias']);
	});
});

describe('parseCatalogSearch', () => {
	it('ignora claves desconocidas sin ocultar el estado predeterminado', () => {
		expect(parseCatalogSearch('?foo=bar&otro=1')).toEqual(defaultCatalogState());
	});

	it('descarta un valor de orden desconocido y conserva el resto de criterios', () => {
		expect(parseCatalogSearch('?sort=inventado&category=modelos')).toEqual(
			state({ category: 'modelos', sort: 'relevancia' }),
		);
	});

	it('acepta parámetros válidos conocidos', () => {
		expect(parseCatalogSearch('?q=agentes&category=agentes&sort=titulo')).toEqual(
			state({ q: 'agentes', category: 'agentes', sort: 'titulo' }),
		);
	});
});

describe('serializeCatalogSearch', () => {
	it('omite valores predeterminados y conserva un orden estable', () => {
		expect(
			serializeCatalogSearch(state({ sort: 'titulo', q: 'agentes', decision: 'adopcion' })),
		).toBe('?q=agentes&decision=adopcion&sort=titulo');
		expect(serializeCatalogSearch(defaultCatalogState())).toBe('');
	});

	it('produce una URL que revierte al mismo estado (round-trip)', () => {
		const original = state({
			q: 'Modelos y Agéntes',
			category: 'modelos',
			status: 'vigente',
			year: '2026',
			decision: 'adopcion',
			sort: 'fecha',
		});
		const roundTripped = parseCatalogSearch(serializeCatalogSearch(original));
		expect(roundTripped).toEqual(original);
	});
});

describe('isDefaultCatalogState', () => {
	it('detecta el estado predeterminado y sus variaciones', () => {
		expect(isDefaultCatalogState(defaultCatalogState())).toBe(true);
		expect(isDefaultCatalogState(state({ q: 'x' }))).toBe(false);
	});
});
