export const categories = [
	'agentes',
	'modelos',
	'seleccion',
	'integraciones',
	'metodologias',
] as const;

export const researchStatuses = [
	'vigente',
	'requiere-revalidacion',
	'historico',
] as const;

export const evidenceLevels = ['alta', 'media', 'baja', 'mixta'] as const;
export const researchRoles = ['catalog', 'featured-source'] as const;

export interface ResearchMetadata {
	id: string;
	title: string;
	slug: string;
	summary: string;
	category: (typeof categories)[number];
	status: (typeof researchStatuses)[number];
	cutoffDate: string;
	revalidateAfter: string;
	evidenceLevel: (typeof evidenceLevels)[number];
	decisionType: string;
	role: (typeof researchRoles)[number];
	featuredStory?: string;
}

export interface ResearchStudy {
	fileName: string;
	filePath: string;
	metadata: ResearchMetadata;
	body: string;
	datasets: ResearchDataset[];
}

export interface DatasetDeclaration {
	id: string;
	schema: DatasetSchema;
	unit: string;
}

export type DatasetSchema =
	| 'weighted-ranking'
	| 'sdlc-map'
	| 'candidate-matrix'
	| 'profile-recommendation'
	| 'sensitivity-series';

export interface ResearchDataset extends DatasetDeclaration {
	headers: string[];
	rows: Record<string, string>[];
	sourceFile: string;
}
