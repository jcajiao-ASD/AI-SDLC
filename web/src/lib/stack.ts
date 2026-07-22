import { column, plainText } from './datasets';
import {
	parseCandidateReferences,
	technicalValue,
	type CandidateReference,
} from './recommendation-contract';
import type { ResearchDataset } from './types';

export type CompatibilityStatus =
	| 'nativa'
	| 'condicionada'
	| 'incompatible'
	| 'no-confirmada';

export type StackStatus =
	| 'verificado'
	| 'verificado-condicionado'
	| 'incompatible'
	| 'no-confirmado';

export interface RecommendationOption {
	key: string;
	label: string;
	candidates: CandidateReference[];
	recommendation: string;
	reason: string;
	caveat: string;
}

export interface CompatibilityRecord {
	agentKey: string;
	agentLabel: string;
	componentKey: string;
	componentLabel: string;
	status: CompatibilityStatus;
	mechanism: string;
	note: string;
	source: string;
	verifiedAt: string;
}

export interface StackCombination {
	agentKey: string;
	agentLabel: string;
	modelKey: string;
	modelLabel: string;
	frameworkKey?: string;
	frameworkLabel?: string;
	status: Extract<StackStatus, 'verificado' | 'verificado-condicionado'>;
	modelCompatibility: CompatibilityRecord;
	frameworkCompatibility?: CompatibilityRecord;
}

export interface BlockedCombination {
	agentKey: string;
	agentLabel: string;
	modelKey: string;
	modelLabel: string;
	frameworkKey?: string;
	frameworkLabel?: string;
	status: Extract<StackStatus, 'incompatible' | 'no-confirmado'>;
	conflicts: CompatibilityRecord[];
}

export interface CompatibleAlternative {
	agentKey: string;
	agentLabel: string;
	componentKey: string;
	componentLabel: string;
	status: Extract<CompatibilityStatus, 'nativa' | 'condicionada'>;
	mechanism: string;
}

export interface StackResolution {
	status: StackStatus;
	recommendationState: 'final' | 'pilot' | 'blocked';
	combinations: StackCombination[];
	blocked: BlockedCombination[];
	alternatives: CompatibleAlternative[];
	pilotAgents: string[];
}

function sourceUrl(value: string): string {
	const markdownLink = value.match(/\]\((https?:\/\/[^)]+)\)/);
	if (markdownLink) return markdownLink[1];
	const autolink = value.match(/<(https?:\/\/[^>]+)>/);
	if (autolink) return autolink[1];
	return value.trim();
}

function recommendationLabelHeader(dataset: ResearchDataset): string {
	if (dataset.id === 'llm-sdlc-map') return column(dataset, /fase del sdlc/);
	if (dataset.id === 'framework-profile-recommendations') {
		return column(dataset, /escenario/);
	}
	return column(dataset, /perfil/);
}

function recommendationValueHeader(dataset: ResearchDataset): string {
	if (dataset.id === 'llm-sdlc-map') return column(dataset, /mejor llm/);
	if (dataset.id === 'framework-profile-recommendations') {
		return column(dataset, /recomendacion/);
	}
	return column(dataset, /herramienta/);
}

export function recommendationOptions(
	dataset: ResearchDataset,
): RecommendationOption[] {
	const keyHeader = column(dataset, /clave de contexto/);
	const candidatesHeader = column(dataset, /candidatos/);
	const labelHeader = recommendationLabelHeader(dataset);
	const recommendationHeader = recommendationValueHeader(dataset);
	const reasonHeader = column(dataset, /por que|motivo/);
	const caveatHeader =
		dataset.headers.find((header) =>
			/caveat|limite/i.test(
				header.normalize('NFD').replace(/\p{Diacritic}/gu, ''),
			),
		) ?? column(dataset, /alternativa/);
	const configurableHeader = dataset.headers.find((header) =>
		/configurable/i.test(header),
	);

	return dataset.rows
		.filter(
			(row) =>
				!configurableHeader ||
				!['no', 'false'].includes(
					plainText(row[configurableHeader]).toLowerCase(),
				),
		)
		.map((row, index) => ({
			key: technicalValue(row[keyHeader]),
			label: plainText(row[labelHeader]),
			candidates: parseCandidateReferences(
				row[candidatesHeader],
				`Dataset ${dataset.id}, fila ${index + 1}`,
			),
			recommendation: plainText(row[recommendationHeader]),
			reason: plainText(row[reasonHeader]),
			caveat: plainText(row[caveatHeader]),
		}));
}

export function compatibilityRecords(
	dataset: ResearchDataset,
): CompatibilityRecord[] {
	const agentKeyHeader = column(dataset, /clave de agente/);
	const agentHeader = column(dataset, /^agente$/);
	const componentKeyHeader = column(dataset, /clave de componente/);
	const componentHeader = column(dataset, /^componente$/);
	const statusHeader = column(dataset, /estado/);
	const mechanismHeader = column(dataset, /mecanismo/);
	const noteHeader = column(dataset, /nota/);
	const sourceHeader = column(dataset, /fuente/);
	const verifiedHeader = column(dataset, /verificado el/);

	return dataset.rows.map((row) => ({
		agentKey: technicalValue(row[agentKeyHeader]),
		agentLabel: plainText(row[agentHeader]),
		componentKey: technicalValue(row[componentKeyHeader]),
		componentLabel: plainText(row[componentHeader]),
		status: technicalValue(row[statusHeader]) as CompatibilityStatus,
		mechanism: plainText(row[mechanismHeader]),
		note: plainText(row[noteHeader]),
		source: sourceUrl(row[sourceHeader]),
		verifiedAt: technicalValue(row[verifiedHeader]),
	}));
}

function selectableCandidates(option: RecommendationOption): CandidateReference[] {
	return option.candidates.filter(({ role }) =>
		['primary', 'co-primary', 'none'].includes(role),
	);
}

function lookup(
	records: CompatibilityRecord[],
	agentKey: string,
	componentKey: string,
): CompatibilityRecord {
	return (
		records.find(
			(record) =>
				record.agentKey === agentKey &&
				record.componentKey === componentKey,
		) ?? {
			agentKey,
			agentLabel: agentKey,
			componentKey,
			componentLabel: componentKey,
			status: 'no-confirmada',
			mechanism: 'Sin relación documentada',
			note: 'No existe una fila canónica que confirme esta combinación.',
			source: '',
			verifiedAt: '',
		}
	);
}

function blockedStatus(records: CompatibilityRecord[]): BlockedCombination['status'] {
	return records.some(({ status }) => status === 'incompatible')
		? 'incompatible'
		: 'no-confirmado';
}

function validStatus(records: CompatibilityRecord[]): StackCombination['status'] {
	return records.some(({ status }) => status === 'condicionada')
		? 'verificado-condicionado'
		: 'verificado';
}

function labels(records: CompatibilityRecord[]) {
	const agents = new Map<string, string>();
	const components = new Map<string, string>();
	for (const record of records) {
		agents.set(record.agentKey, record.agentLabel);
		components.set(record.componentKey, record.componentLabel);
	}
	return { agents, components };
}

function compatibleAlternatives(
	conflicts: BlockedCombination[],
	modelRecords: CompatibilityRecord[],
	frameworkRecords: CompatibilityRecord[],
): CompatibleAlternative[] {
	const conflictingComponents = new Set(
		conflicts.flatMap((combination) =>
			combination.conflicts.map((record) => record.componentKey),
		),
	);
	const alternatives = [...modelRecords, ...frameworkRecords]
		.filter(
			(record) =>
				conflictingComponents.has(record.componentKey) &&
				['nativa', 'condicionada'].includes(record.status),
		)
		.map((record) => ({
			agentKey: record.agentKey,
			agentLabel: record.agentLabel,
			componentKey: record.componentKey,
			componentLabel: record.componentLabel,
			status: record.status as CompatibleAlternative['status'],
			mechanism: record.mechanism,
		}));

	return alternatives.filter(
		(alternative, index) =>
			alternatives.findIndex(
				(candidate) =>
					candidate.agentKey === alternative.agentKey &&
					candidate.componentKey === alternative.componentKey,
			) === index,
	);
}

export function resolveStack(
	agent: RecommendationOption,
	model: RecommendationOption,
	framework: RecommendationOption,
	modelRecords: CompatibilityRecord[],
	frameworkRecords: CompatibilityRecord[],
): StackResolution {
	const allRecords = [...modelRecords, ...frameworkRecords];
	const { agents, components } = labels(allRecords);
	const pilotAgents = agent.candidates
		.filter(({ role }) => role === 'pilot')
		.map(({ key }) => agents.get(key) ?? key);
	const agentCandidates = selectableCandidates(agent).filter(
		({ role }) => role !== 'none',
	);
	const modelCandidates = selectableCandidates(model).filter(
		({ role }) => role !== 'none',
	);
	const frameworkCandidates = selectableCandidates(framework);

	if (agentCandidates.length === 0 && pilotAgents.length > 0) {
		return {
			status: 'no-confirmado',
			recommendationState: 'pilot',
			combinations: [],
			blocked: [],
			alternatives: [],
			pilotAgents,
		};
	}

	const combinations: StackCombination[] = [];
	const blocked: BlockedCombination[] = [];

	for (const agentCandidate of agentCandidates) {
		for (const modelCandidate of modelCandidates) {
			for (const frameworkCandidate of frameworkCandidates) {
				const modelCompatibility = lookup(
					modelRecords,
					agentCandidate.key,
					modelCandidate.key,
				);
				const frameworkCompatibility =
					frameworkCandidate.role === 'none'
						? undefined
						: lookup(
								frameworkRecords,
								agentCandidate.key,
								frameworkCandidate.key,
							);
				const relations = [
					modelCompatibility,
					...(frameworkCompatibility ? [frameworkCompatibility] : []),
				];
				const conflicts = relations.filter(({ status }) =>
					['incompatible', 'no-confirmada'].includes(status),
				);
				const base = {
					agentKey: agentCandidate.key,
					agentLabel: agents.get(agentCandidate.key) ?? agent.recommendation,
					modelKey: modelCandidate.key,
					modelLabel:
						components.get(modelCandidate.key) ?? model.recommendation,
					frameworkKey:
						frameworkCandidate.role === 'none'
							? undefined
							: frameworkCandidate.key,
					frameworkLabel:
						frameworkCandidate.role === 'none'
							? undefined
							: components.get(frameworkCandidate.key) ??
								framework.recommendation,
				};

				if (conflicts.length > 0) {
					blocked.push({
						...base,
						status: blockedStatus(conflicts),
						conflicts,
					});
				} else {
					combinations.push({
						...base,
						status: validStatus(relations),
						modelCompatibility,
						frameworkCompatibility,
					});
				}
			}
		}
	}

	if (combinations.length > 0) {
		return {
			status: combinations.some(({ status }) => status === 'verificado')
				? 'verificado'
				: 'verificado-condicionado',
			recommendationState: 'final',
			combinations,
			blocked,
			alternatives: compatibleAlternatives(
				blocked,
				modelRecords,
				frameworkRecords,
			),
			pilotAgents,
		};
	}

	return {
		status: blocked.some(({ status }) => status === 'incompatible')
			? 'incompatible'
			: 'no-confirmado',
		recommendationState: 'blocked',
		combinations: [],
		blocked,
		alternatives: compatibleAlternatives(
			blocked,
			modelRecords,
			frameworkRecords,
		),
		pilotAgents,
	};
}
