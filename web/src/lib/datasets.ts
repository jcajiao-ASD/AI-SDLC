import type { ResearchDataset } from './types';

export function plainText(value: string): string {
	return value
		.replace(/!\[([^\]]*)\]\([^)]+\)/g, '$1')
		.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
		.replace(/[*_`]/g, '')
		.replace(/<[^>]+>/g, '')
		.trim();
}

export function column(dataset: ResearchDataset, pattern: RegExp): string {
	const header = dataset.headers.find((candidate) =>
		pattern.test(
			candidate
				.normalize('NFD')
				.replace(/\p{Diacritic}/gu, '')
				.replace(/[*_`]/g, '')
				.toLowerCase(),
		),
	);
	if (!header) throw new Error(`Dataset ${dataset.id}: columna no encontrada (${pattern})`);
	return header;
}

export function sensitivityBands(dataset: ResearchDataset) {
	const weightHeader = column(dataset, /peso agregado/);
	const leaderHeader = column(dataset, /lider/);
	return dataset.rows.map((row) => {
		const values = row[weightHeader]
			.replaceAll(',', '.')
			.match(/\d+(?:\.\d+)?/g)
			?.map(Number);
		if (!values || values.length < 2) {
			throw new Error(`Dataset ${dataset.id}: rango de sensibilidad inválido`);
		}
		const rawLeader = plainText(row[leaderHeader]);
		const [leader, ...noteParts] = rawLeader.split(' (');
		return {
			from: values[0],
			to: values[1],
			leader,
			note: noteParts.length ? `(${noteParts.join(' (')}` : undefined,
		};
	});
}
