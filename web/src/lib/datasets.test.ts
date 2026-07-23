import { describe, expect, it } from 'vitest';
import { findDataset, loadStudies } from './research';
import { sensitivityBands } from './datasets';

describe('transformaciones de datasets', () => {
	it('deriva los cruces aproximados desde la tabla canónica', async () => {
		const studies = await loadStudies();
		const bands = sensitivityBands(findDataset(studies, 'framework-sensitivity'));
		expect(bands).toEqual([
			{ from: 0, to: 33.5, leader: 'GSD Core', note: undefined },
			{
				from: 33.5,
				to: 38.3,
				leader: 'GitHub Spec Kit',
				note: '(banda angosta, margen mínimo)',
			},
			{
				from: 38.3,
				to: 100,
				leader: 'OpenSpec',
				note: '(margen creciente monótono)',
			},
		]);
	});
});
