import { describe, expect, test } from 'vitest';
import { ceremonyModel, edgeKey, hasCeremonyView } from './ceremony';

describe('ceremonyModel', () => {
	const nodeIds = new Set(ceremonyModel.nodes.map((node) => node.id));
	const edgeKeys = new Set(ceremonyModel.edges.map((edge) => edgeKey(edge)));

	test('cada arista referencia nodos existentes', () => {
		for (const edge of ceremonyModel.edges) {
			expect(nodeIds.has(edge.from)).toBe(true);
			expect(nodeIds.has(edge.to)).toBe(true);
		}
	});

	test('cada ejemplo referencia únicamente aristas declaradas en el modelo', () => {
		for (const example of ceremonyModel.examples) {
			for (const key of example.pathEdgeKeys) {
				expect(edgeKeys.has(key)).toBe(true);
			}
		}
	});

	test('ambos ejemplos comparten el mismo conjunto base de nodos', () => {
		for (const example of ceremonyModel.examples) {
			for (const stepId of example.stepIds) {
				expect(nodeIds.has(stepId)).toBe(true);
			}
		}
		expect(ceremonyModel.nodes.length).toBe(6);
		expect(ceremonyModel.examples.length).toBe(2);
	});

	test('la ceremonia con solicitud de cambios vuelve a propose en vez de avanzar a apply', () => {
		const example = ceremonyModel.examples.find((item) => item.id === 'solicitud-de-cambios');
		expect(example?.pathEdgeKeys).toContain(edgeKey({ from: 'checkpoint', to: 'propose' }));
		expect(example?.pathEdgeKeys).not.toContain(edgeKey({ from: 'checkpoint', to: 'apply' }));
	});
});

describe('hasCeremonyView', () => {
	test('solo habilita el módulo para el estudio de OpenSpec', () => {
		expect(hasCeremonyView('openspec')).toBe(true);
		expect(hasCeremonyView('comparativa-llms-sdlc')).toBe(false);
	});
});
