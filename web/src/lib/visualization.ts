import type { ResearchDataset, ResearchStudy } from './types';
import { column, plainText } from './datasets';
import { assertUniqueKeys, slugifyKey } from './keys';
import { withBase } from './paths';

export interface VisualizationDatum {
	key: string;
	label: string;
	value: number;
	detail?: string;
	isLeader: boolean;
}

export interface VisualizationSource {
	label: string;
	href: string;
}

export interface VisualizationModel {
	groupId: string;
	title: string;
	description: string;
	unit: string;
	domain: [number, number];
	cutoffDate: string;
	confidence: string;
	source: VisualizationSource;
	caveat: string;
	data: VisualizationDatum[];
}

export interface RankingVisualizationOptions {
	title: string;
	description: string;
	caveat: string;
	domain?: [number, number];
}

const unitLabels: Record<string, string> = {
	'score-100': 'Puntuación / 100',
};

const confidenceLabels: Record<string, string> = {
	alta: 'Confianza alta',
	media: 'Confianza media',
	baja: 'Confianza baja',
	mixta: 'Confianza mixta',
};

function resolveUnitLabel(unit: string, source: string): string {
	const label = unitLabels[unit];
	if (!label) {
		throw new Error(`${source}: unidad sin etiqueta declarada (${unit})`);
	}
	return label;
}

function resolveConfidenceLabel(evidenceLevel: string, source: string): string {
	const label = confidenceLabels[evidenceLevel];
	if (!label) {
		throw new Error(`${source}: nivel de confianza sin etiqueta declarada (${evidenceLevel})`);
	}
	return label;
}

function numericValue(value: string, source: string): number {
	const normalized = value
		.replace(/<[^>]+>/g, '')
		.replace(/[*_]/g, '')
		.replace(',', '.')
		.match(/-?\d+(?:\.\d+)?/);
	if (!normalized) {
		throw new Error(`${source}: valor numérico inválido (${value})`);
	}
	return Number(normalized[0]);
}

function rankValue(value: string, source: string): number {
	const match = value.match(/\d+/);
	if (!match) {
		throw new Error(`${source}: puesto inválido (${value})`);
	}
	return Number(match[0]);
}

function confidenceDetailHeader(dataset: ResearchDataset): string | undefined {
	return dataset.headers.find((candidate) =>
		/confianza/i.test(candidate.normalize('NFD').replace(/\p{Diacritic}/gu, '')),
	);
}

export function buildRankingVisualization(
	dataset: ResearchDataset,
	study: ResearchStudy,
	options: RankingVisualizationOptions,
): VisualizationModel {
	const source = `Dataset ${dataset.id}`;
	if (dataset.schema !== 'weighted-ranking') {
		throw new Error(`${source}: se esperaba el esquema weighted-ranking`);
	}
	if (!options.caveat.trim()) {
		throw new Error(`${source}: falta el caveat editorial de la visualización`);
	}

	const rankHeader = column(dataset, /puesto/);
	const labelHeader = column(dataset, /(modelo|framework)/);
	const valueHeader = column(dataset, /(puntuacion|puntaje|total)/);
	const detailHeader = confidenceDetailHeader(dataset);

	const data: VisualizationDatum[] = dataset.rows
		.map((row) => {
			const label = plainText(row[labelHeader]);
			return {
				key: slugifyKey(label),
				label,
				value: numericValue(row[valueHeader], source),
				detail: detailHeader ? plainText(row[detailHeader]) : undefined,
				isLeader: rankValue(row[rankHeader], source) === 1,
			};
		})
		.sort((a, b) => b.value - a.value);

	assertUniqueKeys(
		data.map((datum) => datum.key),
		source,
	);

	if (!data.some((datum) => datum.isLeader)) {
		throw new Error(`${source}: ninguna fila declara el puesto 1`);
	}

	return {
		groupId: dataset.id,
		title: options.title,
		description: options.description,
		unit: resolveUnitLabel(dataset.unit, source),
		domain: options.domain ?? [0, 100],
		cutoffDate: study.metadata.cutoffDate,
		confidence: resolveConfidenceLabel(study.metadata.evidenceLevel, source),
		source: {
			label: study.metadata.title,
			href: withBase(`/investigaciones/${study.metadata.slug}/`),
		},
		caveat: options.caveat,
		data,
	};
}
