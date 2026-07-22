import { describe, expect, it } from 'vitest';
import { winnerAtWeight } from './SensitivityExplorer';

const bands = [
	{ from: 0, to: 33.5, leader: 'GSD Core' },
	{ from: 33.5, to: 38.3, leader: 'GitHub Spec Kit' },
	{ from: 38.3, to: 100, leader: 'OpenSpec' },
];

describe('explorador de sensibilidad', () => {
	it('selecciona el líder por peso de adopción', () => {
		expect(winnerAtWeight(20, bands).leader).toBe('GSD Core');
		expect(winnerAtWeight(36, bands).leader).toBe('GitHub Spec Kit');
		expect(winnerAtWeight(65, bands).leader).toBe('OpenSpec');
	});
});
