import { readFile, readdir } from 'node:fs/promises';
import { resolve } from 'node:path';
import matter from 'gray-matter';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeRaw from 'rehype-raw';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeStringify from 'rehype-stringify';
import { z } from 'zod';
import {
	categories,
	evidenceLevels,
	researchRoles,
	researchStatuses,
	type DatasetDeclaration,
	type DatasetSchema,
	type ResearchDataset,
	type ResearchMetadata,
	type ResearchStudy,
} from './types';
import { withBase } from './paths';
import {
	isStableKey,
	parseCandidateReferences,
	technicalValue,
} from './recommendation-contract';

const researchDirectory =
	process.env.RESEARCH_DIR || resolve(process.cwd(), '..', 'research');
const datePattern = /^\d{4}-\d{2}-\d{2}$/;
const emojiPresentationPattern =
	/\p{Emoji_Presentation}|\p{Emoji}\uFE0F|\uFE0F/u;
const dateField = z.preprocess(
	(value) => (value instanceof Date ? value.toISOString().slice(0, 10) : value),
	z.string().regex(datePattern),
);

export const metadataSchema = z
	.object({
		id: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
		title: z.string().min(8),
		slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
		summary: z.string().min(30),
		category: z.enum(categories),
		status: z.enum(researchStatuses),
		cutoffDate: dateField,
		revalidateAfter: dateField,
		evidenceLevel: z.enum(evidenceLevels),
		decisionType: z.string().min(3),
		role: z.enum(researchRoles),
		featuredStory: z
			.string()
			.regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
			.optional(),
		relatedStories: z
			.array(z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/))
			.refine((values) => new Set(values).size === values.length, {
				message: 'relatedStories no puede contener duplicados',
			})
			.optional(),
	})
	.superRefine((metadata, context) => {
		if (metadata.revalidateAfter < metadata.cutoffDate) {
			context.addIssue({
				code: 'custom',
				path: ['revalidateAfter'],
				message: 'revalidateAfter no puede ser anterior a cutoffDate',
			});
		}
		if (metadata.role === 'featured-source' && !metadata.featuredStory) {
			context.addIssue({
				code: 'custom',
				path: ['featuredStory'],
				message: 'Una fuente destacada debe declarar featuredStory',
			});
		}
	});

const declarationPattern =
	/<!-- ai-sdlc-dataset:\s*id=([^\s]+)\s+schema=([^\s]+)\s+unit=([^\s]+)\s*-->\s*\n([\s\S]*?)\n<!-- \/ai-sdlc-dataset -->/g;

const supportedSchemas = new Set<DatasetSchema>([
	'weighted-ranking',
	'sdlc-map',
	'candidate-matrix',
	'profile-recommendation',
	'sensitivity-series',
	'compatibility-matrix',
]);

export const storyDatasetIds = new Set([
	'llm-global-ranking',
	'llm-sdlc-map',
	'agent-candidate-matrix',
	'agent-profile-recommendations',
	'framework-adoption-ranking',
	'framework-quality-ranking',
	'framework-sensitivity',
	'framework-profile-recommendations',
	'agent-model-compatibility',
	'agent-framework-compatibility',
]);

export const storyDefinitions = {
	'llm-por-fase': 'Qué LLM usar en cada fase del SDLC',
	'seleccion-agente': 'Qué agente elegir según tu ecosistema',
	'seleccion-framework': 'Qué framework agéntico adoptar',
	'configurador-stack': 'Configurar un stack AI-SDLC compatible',
} as const;

const storySlugs = new Set(Object.keys(storyDefinitions));

export function findEmojiPresentation(value: string): string | undefined {
	return value.match(emojiPresentationPattern)?.[0];
}

export function assertNoEmojiPresentation(
	value: string,
	sourceFile: string,
): void {
	const emoji = findEmojiPresentation(value);
	if (emoji) {
		throw new Error(
			`Contenido ${sourceFile}: emoji pictográfico no permitido (${JSON.stringify(emoji)})`,
		);
	}
}

function normalizeHeader(value: string): string {
	return value
		.normalize('NFD')
		.replace(/\p{Diacritic}/gu, '')
		.replace(/[*_`]/g, '')
		.toLowerCase()
		.trim();
}

function splitTableRow(line: string): string[] {
	return line
		.trim()
		.replace(/^\|/, '')
		.replace(/\|$/, '')
		.split(/(?<!\\)\|/)
		.map((cell) => cell.trim().replaceAll('\\|', '|'));
}

function parseTable(source: string, declaration: DatasetDeclaration): ResearchDataset {
	const lines = source
		.split('\n')
		.map((line) => line.trim())
		.filter((line) => line.startsWith('|'));

	if (lines.length < 3) {
		throw new Error(`Dataset ${declaration.id}: se esperaba una tabla GFM completa`);
	}

	const headers = splitTableRow(lines[0]);
	const separator = splitTableRow(lines[1]);
	if (
		headers.length !== separator.length ||
		separator.some((cell) => !/^:?-{3,}:?$/.test(cell))
	) {
		throw new Error(`Dataset ${declaration.id}: separador GFM inválido`);
	}

	const rows = lines.slice(2).map((line, index) => {
		const cells = splitTableRow(line);
		if (cells.length !== headers.length) {
			throw new Error(
				`Dataset ${declaration.id}: fila ${index + 1} tiene ${cells.length} celdas; se esperaban ${headers.length}`,
			);
		}
		return Object.fromEntries(headers.map((header, cellIndex) => [header, cells[cellIndex]]));
	});

	if (rows.length === 0) {
		throw new Error(`Dataset ${declaration.id}: no contiene filas de datos`);
	}

	return { ...declaration, headers, rows, sourceFile: '' };
}

function requireHeaders(
	dataset: ResearchDataset,
	requirements: RegExp[],
): void {
	const headers = dataset.headers.map(normalizeHeader);
	for (const requirement of requirements) {
		if (!headers.some((header) => requirement.test(header))) {
			throw new Error(
				`Dataset ${dataset.id}: falta una columna compatible con ${requirement}`,
			);
		}
	}
}

function header(dataset: ResearchDataset, pattern: RegExp): string {
	const found = dataset.headers.find((candidate) =>
		pattern.test(normalizeHeader(candidate)),
	);
	if (!found) {
		throw new Error(`Dataset ${dataset.id}: columna no encontrada (${pattern})`);
	}
	return found;
}

function normalizedCell(value: string): string {
	return value
		.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
		.replace(/[*_`]/g, '')
		.normalize('NFD')
		.replace(/\p{Diacritic}/gu, '')
		.toLowerCase()
		.trim();
}

function validateRecommendationRows(dataset: ResearchDataset): void {
	const contextHeader = header(dataset, /clave de contexto/);
	const candidatesHeader = header(dataset, /candidatos/);
	const configurableHeader = dataset.headers.find((candidate) =>
		/configurable/.test(normalizeHeader(candidate)),
	);

	for (const [index, row] of dataset.rows.entries()) {
		if (
			configurableHeader &&
			['no', 'false'].includes(normalizedCell(row[configurableHeader]))
		) {
			continue;
		}
		const contextKey = technicalValue(row[contextHeader]);
		if (!isStableKey(contextKey)) {
			throw new Error(
				`Dataset ${dataset.id}: fila ${index + 1} tiene clave de contexto inválida (${contextKey})`,
			);
		}
		parseCandidateReferences(
			row[candidatesHeader],
			`Dataset ${dataset.id}, fila ${index + 1}`,
		);
	}
}

function validateCompatibilityRows(dataset: ResearchDataset): void {
	const agentKeyHeader = header(dataset, /clave de agente/);
	const componentKeyHeader = header(dataset, /clave de componente/);
	const statusHeader = header(dataset, /estado/);
	const mechanismHeader = header(dataset, /mecanismo/);
	const noteHeader = header(dataset, /nota/);
	const sourceHeader = header(dataset, /fuente/);
	const verifiedHeader = header(dataset, /verificado el/);
	const statuses = new Set([
		'nativa',
		'condicionada',
		'incompatible',
		'no-confirmada',
	]);
	const pairs = new Set<string>();

	for (const [index, row] of dataset.rows.entries()) {
		const agentKey = technicalValue(row[agentKeyHeader]);
		const componentKey = technicalValue(row[componentKeyHeader]);
		const pair = `${agentKey}:${componentKey}`;
		if (!isStableKey(agentKey) || !isStableKey(componentKey)) {
			throw new Error(
				`Dataset ${dataset.id}: fila ${index + 1} contiene una clave inválida`,
			);
		}
		if (pairs.has(pair)) {
			throw new Error(`Dataset ${dataset.id}: relación duplicada (${pair})`);
		}
		pairs.add(pair);
		if (!statuses.has(row[statusHeader])) {
			throw new Error(
				`Dataset ${dataset.id}: estado de compatibilidad inválido (${row[statusHeader]})`,
			);
		}
		if (
			!row[mechanismHeader].trim() ||
			!row[noteHeader].trim() ||
			!row[sourceHeader].trim()
		) {
			throw new Error(
				`Dataset ${dataset.id}: fila ${index + 1} carece de mecanismo, nota o fuente`,
			);
		}
		if (!datePattern.test(row[verifiedHeader])) {
			throw new Error(
				`Dataset ${dataset.id}: fecha de verificación inválida (${row[verifiedHeader]})`,
			);
		}
	}
}

function validateDatasetShape(dataset: ResearchDataset): void {
	switch (dataset.schema) {
		case 'weighted-ranking':
			requireHeaders(dataset, [/puesto/, /(modelo|framework)/, /(puntuacion|puntaje|total)/]);
			break;
		case 'sdlc-map':
			requireHeaders(dataset, [
				/clave de contexto/,
				/candidatos/,
				/fase del sdlc/,
				/(mejor llm|modelo recomendado)/,
			]);
			validateRecommendationRows(dataset);
			break;
		case 'candidate-matrix':
			requireHeaders(dataset, [/clave de agente/, /candidato/, /(harness|sdlc)/]);
			break;
		case 'profile-recommendation':
			requireHeaders(dataset, [
				/clave de contexto/,
				/candidatos/,
				/(perfil|escenario)/,
				/(herramienta|recomendacion)/,
				/(motivo|por que)/,
				/(caveat|limite)/,
			]);
			validateRecommendationRows(dataset);
			break;
		case 'sensitivity-series':
			requireHeaders(dataset, [/peso agregado/, /lider/]);
			break;
		case 'compatibility-matrix':
			requireHeaders(dataset, [
				/clave de agente/,
				/^agente$/,
				/clave de componente/,
				/^componente$/,
				/estado/,
				/mecanismo/,
				/nota/,
				/fuente/,
				/verificado el/,
			]);
			validateCompatibilityRows(dataset);
			break;
	}
}

export function parseDatasets(markdown: string, sourceFile = 'desconocido'): ResearchDataset[] {
	const datasets: ResearchDataset[] = [];
	for (const match of markdown.matchAll(declarationPattern)) {
		const schema = match[2] as DatasetSchema;
		if (!supportedSchemas.has(schema)) {
			throw new Error(`${sourceFile}: esquema de dataset no soportado: ${match[2]}`);
		}
		const dataset = parseTable(match[4], {
			id: match[1],
			schema,
			unit: match[3],
		});
		dataset.sourceFile = sourceFile;
		validateDatasetShape(dataset);
		datasets.push(dataset);
	}
	return datasets;
}

function formatZodError(fileName: string, error: z.ZodError): Error {
	const details = error.issues
		.map((issue) => `${issue.path.join('.') || 'frontmatter'}: ${issue.message}`)
		.join('; ');
	return new Error(`${fileName}: frontmatter inválido (${details})`);
}

export function parseStudy(
	fileName: string,
	filePath: string,
	source: string,
): ResearchStudy {
	const parsed = matter(source);
	const result = metadataSchema.safeParse(parsed.data);
	if (!result.success) {
		throw formatZodError(fileName, result.error);
	}
	return {
		fileName,
		filePath,
		metadata: result.data as ResearchMetadata,
		body: parsed.content,
		datasets: parseDatasets(parsed.content, fileName),
	};
}

let studiesPromise: Promise<ResearchStudy[]> | undefined;

function datasetById(
	studies: ResearchStudy[],
	id: string,
): ResearchDataset {
	const dataset = studies.flatMap((study) => study.datasets).find((item) => item.id === id);
	if (!dataset) throw new Error(`Dataset requerido inexistente: ${id}`);
	return dataset;
}

function keysFromColumn(dataset: ResearchDataset, pattern: RegExp): Set<string> {
	const keyHeader = header(dataset, pattern);
	return new Set(dataset.rows.map((row) => technicalValue(row[keyHeader])));
}

function validateRecommendationReferences(
	dataset: ResearchDataset,
	allowedKeys: Set<string>,
): void {
	const candidatesHeader = header(dataset, /candidatos/);
	const configurableHeader = dataset.headers.find((candidate) =>
		/configurable/.test(normalizeHeader(candidate)),
	);
	for (const [index, row] of dataset.rows.entries()) {
		if (
			configurableHeader &&
			['no', 'false'].includes(normalizedCell(row[configurableHeader]))
		) {
			continue;
		}
		for (const reference of parseCandidateReferences(
			row[candidatesHeader],
			`Dataset ${dataset.id}, fila ${index + 1}`,
		)) {
			if (reference.role !== 'none' && !allowedKeys.has(reference.key)) {
				throw new Error(
					`Dataset ${dataset.id}: candidato inexistente (${reference.key})`,
				);
			}
		}
	}
}

function normalizedCompatibilityLookup(dataset: ResearchDataset): Map<string, string> {
	const agentHeader = header(dataset, /clave de agente/);
	const componentHeader = header(dataset, /clave de componente/);
	const statusHeader = header(dataset, /estado/);
	return new Map(
		dataset.rows.map((row) => [
			`${technicalValue(row[agentHeader])}:${technicalValue(row[componentHeader])}`,
			row[statusHeader],
		]),
	);
}

function validateCandidateMatrixConsistency(
	candidates: ResearchDataset,
	modelCompatibility: ResearchDataset,
): void {
	const agentHeader = header(candidates, /clave de agente/);
	const compatibility = normalizedCompatibilityLookup(modelCompatibility);
	const mappings = [
		{ header: header(candidates, /fable 5/), model: 'claude-fable-5' },
		{ header: header(candidates, /gpt-5\.6 sol/), model: 'gpt-5-6-sol' },
		{ header: header(candidates, /gemini 3\.x/), model: 'gemini-3-1-pro' },
	];

	for (const row of candidates.rows) {
		for (const mapping of mappings) {
			const summary = normalizedCell(row[mapping.header]);
			const expected = summary.includes('byok')
				? 'condicionada'
				: summary.includes('nativo') || summary.startsWith('si')
					? 'nativa'
					: undefined;
			if (!expected) continue;
			const agentKey = technicalValue(row[agentHeader]);
			const actual = compatibility.get(`${agentKey}:${mapping.model}`);
			if (actual !== expected) {
				throw new Error(
					`Datasets de agentes inconsistentes para ${agentKey}:${mapping.model} (${expected} frente a ${actual ?? 'ausente'})`,
				);
			}
		}
	}
}

function validateCrossReferences(studies: ResearchStudy[]): void {
	for (const study of studies) {
		assertKnownStoryReferences(study.metadata, study.fileName);
	}

	const candidates = datasetById(studies, 'agent-candidate-matrix');
	const agentModel = datasetById(studies, 'agent-model-compatibility');
	const agentFramework = datasetById(studies, 'agent-framework-compatibility');
	const agentKeys = keysFromColumn(candidates, /clave de agente/);
	const modelKeys = keysFromColumn(agentModel, /clave de componente/);
	const frameworkKeys = keysFromColumn(agentFramework, /clave de componente/);

	for (const matrix of [agentModel, agentFramework]) {
		for (const key of keysFromColumn(matrix, /clave de agente/)) {
			if (!agentKeys.has(key)) {
				throw new Error(`Dataset ${matrix.id}: agente inexistente (${key})`);
			}
		}
	}

	validateRecommendationReferences(
		datasetById(studies, 'agent-profile-recommendations'),
		agentKeys,
	);
	validateRecommendationReferences(datasetById(studies, 'llm-sdlc-map'), modelKeys);
	validateRecommendationReferences(
		datasetById(studies, 'framework-profile-recommendations'),
		frameworkKeys,
	);
	validateCandidateMatrixConsistency(candidates, agentModel);
}

export function assertKnownStoryReferences(
	metadata: ResearchMetadata,
	fileName: string,
): void {
	for (const story of [
		metadata.featuredStory,
		...(metadata.relatedStories ?? []),
	].filter((value): value is string => Boolean(value))) {
		if (!storySlugs.has(story)) {
			throw new Error(
				`${fileName}: historia relacionada inexistente (${story})`,
			);
		}
	}
}

export async function loadStudies(): Promise<ResearchStudy[]> {
	studiesPromise ??= (async () => {
		const fileNames = (await readdir(researchDirectory))
			.filter((fileName) => fileName.endsWith('.md') && fileName !== '_index.md')
			.sort();
		const studies = await Promise.all(
			fileNames.map(async (fileName) => {
				const filePath = resolve(researchDirectory, fileName);
				return parseStudy(fileName, filePath, await readFile(filePath, 'utf8'));
			}),
		);

		if (studies.length !== 13) {
			throw new Error(`El catálogo debe contener 13 estudios; se encontraron ${studies.length}`);
		}

		const slugs = new Set<string>();
		const datasetIds = new Set<string>();
		for (const study of studies) {
			if (slugs.has(study.metadata.slug)) {
				throw new Error(`Slug duplicado: ${study.metadata.slug}`);
			}
			slugs.add(study.metadata.slug);
			for (const dataset of study.datasets) {
				if (datasetIds.has(dataset.id)) {
					throw new Error(`Dataset duplicado: ${dataset.id}`);
				}
				datasetIds.add(dataset.id);
				if (!storyDatasetIds.has(dataset.id)) {
					throw new Error(`Dataset sin consumidor declarado: ${dataset.id}`);
				}
			}
		}

		for (const datasetId of storyDatasetIds) {
			if (!datasetIds.has(datasetId)) {
				throw new Error(`Dataset requerido inexistente: ${datasetId}`);
			}
			validateCrossReferences(studies);
		}

		return studies.sort((a, b) =>
			b.metadata.cutoffDate.localeCompare(a.metadata.cutoffDate) ||
			a.metadata.title.localeCompare(b.metadata.title, 'es'),
		);
	})();
	return studiesPromise;
}

export function findStudy(studies: ResearchStudy[], slug: string): ResearchStudy {
	const study = studies.find((candidate) => candidate.metadata.slug === slug);
	if (!study) {
		throw new Error(`No existe el estudio con slug ${slug}`);
	}
	return study;
}

export function findDataset(studies: ResearchStudy[], id: string): ResearchDataset {
	for (const study of studies) {
		const dataset = study.datasets.find((candidate) => candidate.id === id);
		if (dataset) return dataset;
	}
	throw new Error(`No existe el dataset ${id}`);
}

function stripDocumentChrome(markdown: string): string {
	return markdown
		.trimStart()
		.replace(/^# .+\n+/, '')
		.replace(/^\[<-\s*[^\]]+\]\([^)]+\)\n+/, '');
}

function rewriteResearchLinks(markdown: string, studies: ResearchStudy[]): string {
	const slugByFile = new Map(studies.map((study) => [study.fileName, study.metadata.slug]));
	return markdown.replace(
		/\]\(([^)#]+\.md)(#[^)]+)?\)/g,
		(fullMatch, fileName: string, hash = '') => {
			if (fileName === '_index.md') return `](${withBase(`/investigaciones/${hash}`)})`;
			const slug = slugByFile.get(fileName);
			return slug ? `](${withBase(`/investigaciones/${slug}/${hash}`)})` : fullMatch;
		},
	);
}

export async function renderStudy(
	study: ResearchStudy,
	studies: ResearchStudy[],
): Promise<string> {
	const markdown = rewriteResearchLinks(stripDocumentChrome(study.body), studies);
	const rendered = await unified()
		.use(remarkParse)
		.use(remarkGfm)
		.use(remarkRehype, { allowDangerousHtml: true })
		.use(rehypeRaw)
		.use(rehypeSlug)
		.use(rehypeAutolinkHeadings, { behavior: 'wrap' })
		.use(rehypeStringify)
		.process(markdown);
	return String(rendered);
}

export async function renderInlineMarkdown(markdown: string): Promise<string> {
	const rendered = await unified()
		.use(remarkParse)
		.use(remarkGfm)
		.use(remarkRehype)
		.use(rehypeStringify)
		.process(markdown);
	return String(rendered).replace(/^<p>/, '').replace(/<\/p>\n?$/, '');
}

export function isPastRevalidation(metadata: ResearchMetadata, today = new Date()): boolean {
	const isoToday = today.toISOString().slice(0, 10);
	return metadata.status === 'requiere-revalidacion' || isoToday > metadata.revalidateAfter;
}
