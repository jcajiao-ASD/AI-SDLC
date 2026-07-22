import { describe, expect, it } from 'vitest';
import {
	resolveStack,
	type CompatibilityRecord,
	type RecommendationOption,
} from './stack';

function option(
	key: string,
	candidates: RecommendationOption['candidates'],
): RecommendationOption {
	return {
		key,
		label: key,
		candidates,
		recommendation: key,
		reason: `Motivo suficientemente explícito para ${key}`,
		caveat: `Caveat suficientemente explícito para ${key}`,
	};
}

function relation(
	agentKey: string,
	componentKey: string,
	status: CompatibilityRecord['status'],
): CompatibilityRecord {
	return {
		agentKey,
		agentLabel: agentKey,
		componentKey,
		componentLabel: componentKey,
		status,
		mechanism: `${status} mediante mecanismo documentado`,
		note: 'Nota verificable',
		source: 'https://example.com/source',
		verifiedAt: '2026-07-22',
	};
}

const model = option('diseno', [
	{ role: 'co-primary', key: 'fable' },
	{ role: 'co-primary', key: 'sol' },
]);
const framework = option('adopcion', [{ role: 'primary', key: 'openspec' }]);

describe('resolver de stack', () => {
	it('conserva co-principales y distingue integración condicionada', () => {
		const result = resolveStack(
			option('github', [{ role: 'primary', key: 'copilot' }]),
			model,
			framework,
			[
				relation('copilot', 'fable', 'nativa'),
				relation('copilot', 'sol', 'condicionada'),
			],
			[relation('copilot', 'openspec', 'nativa')],
		);

		expect(result.recommendationState).toBe('final');
		expect(result.combinations.map(({ status }) => status)).toEqual([
			'verificado',
			'verificado-condicionado',
		]);
	});

	it('bloquea relaciones ausentes y ofrece agentes compatibles sin ranking', () => {
		const result = resolveStack(
			option('jetbrains', [{ role: 'primary', key: 'junie' }]),
			option('pruebas', [{ role: 'primary', key: 'sonnet' }]),
			option('tdd', [{ role: 'primary', key: 'superpowers' }]),
			[
				relation('junie', 'sonnet', 'nativa'),
				relation('cursor', 'sonnet', 'nativa'),
			],
			[
				relation('junie', 'superpowers', 'no-confirmada'),
				relation('cursor', 'superpowers', 'condicionada'),
			],
		);

		expect(result.status).toBe('no-confirmado');
		expect(result.combinations).toHaveLength(0);
		expect(result.alternatives).toContainEqual(
			expect.objectContaining({
				agentKey: 'cursor',
				componentKey: 'superpowers',
			}),
		);
	});

	it('presenta candidatos piloto sin convertirlos en recomendación final', () => {
		const result = resolveStack(
			option('sin-centro', [
				{ role: 'pilot', key: 'cursor' },
				{ role: 'pilot', key: 'junie' },
			]),
			model,
			framework,
			[relation('cursor', 'fable', 'nativa')],
			[relation('cursor', 'openspec', 'nativa')],
		);

		expect(result.recommendationState).toBe('pilot');
		expect(result.combinations).toHaveLength(0);
		expect(result.pilotAgents).toEqual(['cursor', 'junie']);
	});

	it('acepta explícitamente un stack sin framework', () => {
		const result = resolveStack(
			option('github', [{ role: 'primary', key: 'copilot' }]),
			option('devops', [{ role: 'primary', key: 'sol' }]),
			option('hotfix', [{ role: 'none', key: 'none' }]),
			[relation('copilot', 'sol', 'nativa')],
			[],
		);

		expect(result.status).toBe('verificado');
		expect(result.combinations[0].frameworkKey).toBeUndefined();
	});
});
