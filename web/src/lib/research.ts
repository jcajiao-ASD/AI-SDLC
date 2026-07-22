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

const researchDirectory =
	process.env.RESEARCH_DIR || resolve(process.cwd(), '..', 'research');
const datePattern = /^\d{4}-\d{2}-\d{2}$/;
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
]);

export const storyDatasetIds = new Set([
	'llm-global-ranking',
	'llm-sdlc-map',
	'agent-candidate-matrix',
	'agent-profile-recommendations',
	'framework-adoption-ranking',
	'framework-quality-ranking',
	'framework-sensitivity',
]);

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

function validateDatasetShape(dataset: ResearchDataset): void {
	switch (dataset.schema) {
		case 'weighted-ranking':
			requireHeaders(dataset, [/puesto/, /(modelo|framework)/, /(puntuacion|puntaje|total)/]);
			break;
		case 'sdlc-map':
			requireHeaders(dataset, [/fase del sdlc/, /(mejor llm|modelo recomendado)/]);
			break;
		case 'candidate-matrix':
			requireHeaders(dataset, [/candidato/, /(harness|sdlc)/]);
			break;
		case 'profile-recommendation':
			requireHeaders(dataset, [/perfil/, /herramienta/]);
			break;
		case 'sensitivity-series':
			requireHeaders(dataset, [/peso agregado/, /lider/]);
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

export function isPastRevalidation(metadata: ResearchMetadata, today = new Date()): boolean {
	const isoToday = today.toISOString().slice(0, 10);
	return metadata.status === 'requiere-revalidacion' || isoToday > metadata.revalidateAfter;
}

export function numericValue(value: string): number | undefined {
	const normalized = value
		.replace(/<[^>]+>/g, '')
		.replace(/[*_🥇🥈🥉]/g, '')
		.replace(',', '.')
		.match(/-?\d+(?:\.\d+)?/);
	return normalized ? Number(normalized[0]) : undefined;
}
