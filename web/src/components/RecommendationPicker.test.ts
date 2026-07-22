import { describe, expect, it } from 'vitest';
import { agentRecommendations } from './RecommendationPicker';

describe('reglas de recomendación de agentes', () => {
	it('condiciona Copilot CLI al ecosistema GitHub', () => {
		expect(agentRecommendations.github.tool).toBe('GitHub Copilot CLI');
		expect(agentRecommendations.github.caveat).toMatch(/condicionada/i);
	});

	it('no fuerza un ganador cuando no hay ecosistema central', () => {
		expect(agentRecommendations.unclear.tool).toBe('Piloto comparativo');
	});

	it('cubre cada perfil declarado con una regla y un caveat', () => {
		expect(Object.keys(agentRecommendations)).toEqual([
			'github',
			'ide',
			'jetbrains',
			'open',
			'unclear',
		]);
		for (const recommendation of Object.values(agentRecommendations)) {
			expect(recommendation.tool.length).toBeGreaterThan(3);
			expect(recommendation.reason.length).toBeGreaterThan(20);
			expect(recommendation.caveat.length).toBeGreaterThan(20);
		}
	});
});
