import { describe, expect, test } from 'vitest';
import {
	isNavigationDestinationActive,
	navigationDestinations,
	normalizeRoutePath,
} from './navigation';

describe('normalizeRoutePath', () => {
	test('normaliza barras finales y elimina query y hash', () => {
		expect(normalizeRoutePath('/metodologia?fuente=menu#evidencia')).toBe('/metodologia/');
		expect(normalizeRoutePath('/')).toBe('/');
	});

	test('retira el base path configurado', () => {
		expect(normalizeRoutePath('/AI-SDLC/investigaciones/', '/AI-SDLC/')).toBe(
			'/investigaciones/',
		);
		expect(normalizeRoutePath('/AI-SDLC', '/AI-SDLC/')).toBe('/');
	});
});

describe('isNavigationDestinationActive', () => {
	test('activa historias únicamente por coincidencia exacta', () => {
		expect(
			isNavigationDestinationActive(
				navigationDestinations.model,
				'/historias/llm-por-fase/',
			),
		).toBe(true);
		expect(
			isNavigationDestinationActive(
				navigationDestinations.model,
				'/historias/llm-por-fase/apendice/',
			),
		).toBe(false);
	});

	test('hereda Investigaciones en rutas dinámicas sin aceptar prefijos parciales', () => {
		expect(
			isNavigationDestinationActive(
				navigationDestinations.research,
				'/investigaciones/comparativa-llms-sdlc/',
			),
		).toBe(true);
		expect(
			isNavigationDestinationActive(
				navigationDestinations.research,
				'/investigaciones-extra/',
			),
		).toBe(false);
	});

	test('activa destinos publicados bajo un subpath', () => {
		expect(
			isNavigationDestinationActive(
				navigationDestinations.framework,
				'/AI-SDLC/historias/seleccion-framework/',
				'/AI-SDLC/',
			),
		).toBe(true);
		expect(
			isNavigationDestinationActive(
				navigationDestinations.research,
				'/AI-SDLC/investigaciones/comparativa-llms-sdlc/',
				'/AI-SDLC/',
			),
		).toBe(true);
	});
});
