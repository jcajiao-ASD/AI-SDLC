import { z } from 'zod';
import type { ResearchDataset } from './types';

export type TableContentKind = 'data' | 'prose';

export interface TablePresentation {
	caption?: string;
	rowHeader?: string;
	essentialColumns?: string[];
	initiallyHiddenColumns?: string[];
	summaryColumns?: string[];
	contentKinds?: Record<string, TableContentKind>;
}

export interface NormalizedTablePresentation {
	caption?: string;
	rowHeader?: string;
	essentialColumns: string[];
	initiallyHiddenColumns: string[];
	summaryColumns: string[];
	contentKinds: Record<string, TableContentKind>;
}

const tablePresentationSchema = z
	.object({
		caption: z.string().trim().min(1).optional(),
		rowHeader: z.string().trim().min(1).optional(),
		essentialColumns: z.array(z.string().trim().min(1)).default([]),
		initiallyHiddenColumns: z.array(z.string().trim().min(1)).default([]),
		summaryColumns: z.array(z.string().trim().min(1)).default([]),
		contentKinds: z
			.record(z.string().trim().min(1), z.enum(['data', 'prose']))
			.default({}),
	})
	.strict();

const directivePrefix = 'ai-sdlc-table:';

export function normalizeTableHeader(value: string): string {
	return value
		.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
		.replace(/[*_`]/g, '')
		.normalize('NFD')
		.replace(/\p{Diacritic}/gu, '')
		.toLowerCase()
		.trim();
}

export function displayTableHeader(value: string): string {
	return value
		.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
		.replace(/[*_`]/g, '')
		.trim();
}

function unique(values: string[]): string[] {
	return [...new Set(values)];
}

function resolveHeader(
	headers: string[],
	reference: string,
	source: string,
): string {
	const normalizedReference = normalizeTableHeader(reference);
	const matches = headers.filter(
		(header) => normalizeTableHeader(header) === normalizedReference,
	);
	if (matches.length !== 1) {
		throw new Error(
			`${source}: columna de tabla inválida (${reference}); coincidencias: ${matches.length}`,
		);
	}
	return matches[0];
}

function resolveHeaders(
	headers: string[],
	references: string[],
	source: string,
): string[] {
	return unique(references.map((reference) => resolveHeader(headers, reference, source)));
}

export function normalizeTablePresentation(
	headers: string[],
	input: TablePresentation = {},
	source = 'tabla',
): NormalizedTablePresentation {
	const parsed = tablePresentationSchema.safeParse(input);
	if (!parsed.success) {
		const details = parsed.error.issues
			.map((issue) => `${issue.path.join('.') || 'metadata'}: ${issue.message}`)
			.join('; ');
		throw new Error(`${source}: metadata de tabla inválida (${details})`);
	}

	const rowHeader = parsed.data.rowHeader
		? resolveHeader(headers, parsed.data.rowHeader, source)
		: undefined;
	const essentialColumns = resolveHeaders(
		headers,
		[
			...parsed.data.essentialColumns,
			...(rowHeader ? [rowHeader] : []),
		],
		source,
	);
	const initiallyHiddenColumns = resolveHeaders(
		headers,
		parsed.data.initiallyHiddenColumns,
		source,
	);
	const summaryColumns = resolveHeaders(
		headers,
		parsed.data.summaryColumns,
		source,
	);
	const essential = new Set(essentialColumns);
	const conflict = initiallyHiddenColumns.find((header) => essential.has(header));
	if (conflict) {
		throw new Error(
			`${source}: la columna ${conflict} no puede ser esencial e inicialmente oculta`,
		);
	}

	const contentKinds = Object.fromEntries(
		Object.entries(parsed.data.contentKinds).map(([reference, kind]) => [
			resolveHeader(headers, reference, source),
			kind,
		]),
	);

	return {
		caption: parsed.data.caption,
		rowHeader,
		essentialColumns,
		initiallyHiddenColumns,
		summaryColumns,
		contentKinds,
	};
}

export function isTableDirectiveComment(value: string): boolean {
	return value.trimStart().startsWith(directivePrefix);
}

export function parseTableDirectiveComment(
	value: string,
	source = 'directiva de tabla',
): TablePresentation {
	const trimmed = value.trim();
	if (!trimmed.startsWith(directivePrefix)) {
		throw new Error(`${source}: comentario ai-sdlc-table inválido`);
	}
	const payload = trimmed.slice(directivePrefix.length).trim();
	if (payload.includes('--')) {
		throw new Error(`${source}: la directiva ai-sdlc-table no admite secuencias --`);
	}
	try {
		return tablePresentationSchema.parse(JSON.parse(payload));
	} catch (error) {
		if (error instanceof z.ZodError) {
			const details = error.issues
				.map((issue) => `${issue.path.join('.') || 'metadata'}: ${issue.message}`)
				.join('; ');
			throw new Error(`${source}: metadata de tabla inválida (${details})`);
		}
		const message = error instanceof Error ? error.message : String(error);
		throw new Error(`${source}: JSON de ai-sdlc-table inválido (${message})`);
	}
}

function splitMarkdownTableRow(line: string): string[] {
	return line
		.trim()
		.replace(/^\|/, '')
		.replace(/\|$/, '')
		.split(/(?<!\\)\|/)
		.map((cell) => cell.trim().replaceAll('\\|', '|'));
}

export function validateMarkdownTableDirectives(
	markdown: string,
	sourceFile: string,
): number {
	const lines = markdown.split(/\r?\n/);
	let count = 0;

	for (let index = 0; index < lines.length; index++) {
		const line = lines[index].trim();
		if (!line.includes('ai-sdlc-table')) continue;
		const match = line.match(/^<!--\s*(ai-sdlc-table:[\s\S]+)\s*-->$/);
		if (!match) {
			throw new Error(
				`${sourceFile}:${index + 1}: directiva ai-sdlc-table mal formada`,
			);
		}
		const headerLine = lines[index + 1];
		const separatorLine = lines[index + 2];
		if (
			!headerLine?.trim().startsWith('|') ||
			!separatorLine?.trim().startsWith('|')
		) {
			throw new Error(
				`${sourceFile}:${index + 1}: ai-sdlc-table debe preceder inmediatamente una tabla GFM`,
			);
		}
		const headers = splitMarkdownTableRow(headerLine);
		const separator = splitMarkdownTableRow(separatorLine);
		if (
			headers.length !== separator.length ||
			separator.some((cell) => !/^:?-{3,}:?$/.test(cell))
		) {
			throw new Error(
				`${sourceFile}:${index + 1}: ai-sdlc-table precede una tabla GFM inválida`,
			);
		}
		const presentation = parseTableDirectiveComment(
			match[1],
			`${sourceFile}:${index + 1}`,
		);
		normalizeTablePresentation(headers, presentation, `${sourceFile}:${index + 1}`);
		count++;
	}

	return count;
}

function findHeader(headers: string[], pattern: RegExp, source: string): string {
	const match = headers.find((header) => pattern.test(normalizeTableHeader(header)));
	if (!match) {
		throw new Error(`${source}: encabezado requerido no encontrado (${pattern})`);
	}
	return match;
}

function kinds(
	headers: string[],
	dataHeaders: string[],
): Record<string, TableContentKind> {
	const data = new Set(dataHeaders);
	return Object.fromEntries(
		headers.map((header) => [header, data.has(header) ? 'data' : 'prose']),
	);
}

export function datasetTablePresentation(
	dataset: ResearchDataset,
	overrides: TablePresentation = {},
): NormalizedTablePresentation {
	const source = `Dataset ${dataset.id}`;
	const header = (pattern: RegExp) => findHeader(dataset.headers, pattern, source);
	let base: TablePresentation;

	switch (dataset.schema) {
		case 'weighted-ranking': {
			const rank = header(/puesto/);
			const subject = header(/^(modelo|framework)$/);
			const score = header(/(puntuacion|puntaje|total)/);
			base = {
				rowHeader: subject,
				essentialColumns: [rank, subject, score],
				contentKinds: kinds(dataset.headers, dataset.headers),
			};
			break;
		}
		case 'sdlc-map': {
			const phase = header(/fase del sdlc/);
			const recommendation = header(/(mejor llm|modelo recomendado)/);
			const reason = header(/por que/);
			base = {
				rowHeader: phase,
				essentialColumns: [phase, recommendation, reason],
				summaryColumns: [recommendation],
				contentKinds: kinds(dataset.headers, [
					header(/clave de contexto/),
					header(/candidatos/),
					recommendation,
					header(/alternativa/),
				]),
			};
			break;
		}
		case 'candidate-matrix': {
			const candidate = header(/candidato/);
			const harness = header(/(harness|sdlc)/);
			const entry = header(/entrada/);
			base = {
				rowHeader: candidate,
				essentialColumns: [candidate, harness, entry],
				summaryColumns: [harness],
				contentKinds: kinds(
					dataset.headers,
					dataset.headers.filter((value) =>
						/(clave de agente|candidato|tiene)/.test(normalizeTableHeader(value)),
					),
				),
			};
			break;
		}
		case 'profile-recommendation': {
			const context = header(/^(perfil|escenario)/);
			const recommendation = header(/(herramienta seleccionada|recomendacion)/);
			const reason = header(/motivo/);
			base = {
				rowHeader: context,
				essentialColumns: [context, recommendation, reason],
				summaryColumns: [recommendation],
				contentKinds: kinds(dataset.headers, [
					header(/clave de contexto/),
					header(/candidatos/),
					...(dataset.headers.some((value) =>
						/configurable/.test(normalizeTableHeader(value)),
					)
						? [header(/configurable/)]
						: []),
					recommendation,
				]),
			};
			break;
		}
		case 'sensitivity-series': {
			const range = header(/peso agregado/);
			const leader = header(/lider/);
			base = {
				rowHeader: range,
				essentialColumns: [range, leader],
				contentKinds: kinds(dataset.headers, dataset.headers),
			};
			break;
		}
		case 'compatibility-matrix': {
			const agent = header(/^agente$/);
			const component = header(/^componente$/);
			const status = header(/^estado$/);
			base = {
				rowHeader: agent,
				essentialColumns: [agent, component, status],
				summaryColumns: [component, status],
				contentKinds: kinds(dataset.headers, [
					header(/clave de agente/),
					agent,
					header(/clave de componente/),
					component,
					status,
					header(/verificado el/),
				]),
			};
			break;
		}
	}

	return normalizeTablePresentation(
		dataset.headers,
		{
			...base,
			...overrides,
			essentialColumns:
				overrides.essentialColumns ?? base.essentialColumns,
			initiallyHiddenColumns:
				overrides.initiallyHiddenColumns ?? base.initiallyHiddenColumns,
			summaryColumns: overrides.summaryColumns ?? base.summaryColumns,
			contentKinds: {
				...base.contentKinds,
				...overrides.contentKinds,
			},
		},
		source,
	);
}
