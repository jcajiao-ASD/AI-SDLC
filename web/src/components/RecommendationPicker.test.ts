import { describe, expect, it } from 'vitest';
import { findDataset, loadStudies } from '../lib/research';
import { recommendationOptions } from '../lib/stack';

describe('reglas de recomendación de agentes', () => {
	it('deriva cada opción configurable desde el dataset canónico', async () => {
		const studies = await loadStudies();
		const options = recommendationOptions(
			findDataset(studies, 'agent-profile-recommendations'),
		);

		expect(options.map(({ key }) => key)).toEqual([
			'github',
			'ide-jira',
			'jetbrains',
			'apertura',
			'sin-centro',
		]);
		expect(
			options.find(({ key }) => key === 'github')?.recommendation,
		).toMatch(/GitHub Copilot CLI/);
		expect(
			options.find(({ key }) => key === 'sin-centro')?.candidates,
		).toEqual([
			{ role: 'pilot', key: 'cursor' },
			{ role: 'pilot', key: 'junie' },
			{ role: 'pilot', key: 'opencode' },
		]);

		for (const option of options) {
			expect(option.recommendation.length).toBeGreaterThan(3);
			expect(option.reason.length).toBeGreaterThan(20);
			expect(option.caveat.length).toBeGreaterThan(20);
		}
	});
});
