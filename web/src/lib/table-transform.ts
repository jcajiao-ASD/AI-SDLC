import type {
	Comment,
	Element,
	ElementContent,
	Properties,
	Root,
	RootContent,
	Text,
} from 'hast';
import type { Plugin } from 'unified';
import {
	displayTableHeader,
	isTableDirectiveComment,
	normalizeTablePresentation,
	parseTableDirectiveComment,
	type NormalizedTablePresentation,
} from './tables';

interface Options {
	sourceFile: string;
}

interface TransformState {
	currentHeading: string;
	sectionTableOrdinal: number;
	documentTableOrdinal: number;
	sourceFile: string;
}

type Parent = Root | Element;

function isElement(node: RootContent | ElementContent): node is Element {
	return node.type === 'element';
}

function isComment(node: RootContent | ElementContent): node is Comment {
	return node.type === 'comment';
}

function isWhitespace(node: RootContent | ElementContent): node is Text {
	return node.type === 'text' && node.value.trim() === '';
}

function elementChildren(node: Element): Element[] {
	return node.children.filter(isElement);
}

function child(node: Element, tagName: string): Element | undefined {
	return elementChildren(node).find((candidate) => candidate.tagName === tagName);
}

function textContent(node: RootContent | ElementContent): string {
	if (node.type === 'text') return node.value;
	if ('children' in node) return node.children.map(textContent).join('');
	return '';
}

function addClass(node: Element, className: string): void {
	const current = node.properties.className;
	const classes = Array.isArray(current)
		? current.map(String)
		: [];
	if (!classes.includes(className)) classes.push(className);
	node.properties.className = classes;
}

function cloneForMobile<T extends ElementContent>(node: T): T {
	const clone = structuredClone(node);
	const sanitize = (current: ElementContent) => {
		if (current.type !== 'element') return;
		for (const property of [
			'id',
			'ariaLabelledBy',
			'ariaDescribedBy',
			'ariaControls',
			'htmlFor',
		]) {
			delete current.properties[property];
		}
		for (const nested of current.children) sanitize(nested);
	};
	sanitize(clone);
	return clone;
}

function text(value: string): Text {
	return { type: 'text', value };
}

function element(
	tagName: string,
	properties: Properties = {},
	children: ElementContent[] = [],
): Element {
	return { type: 'element', tagName, properties, children };
}

function tableStructure(table: Element): {
	headers: string[];
	headerCells: Element[];
	rows: Element[];
	regular: boolean;
	caption?: Element;
} {
	const caption = child(table, 'caption');
	const thead = child(table, 'thead');
	const tbody = child(table, 'tbody');
	const headerRow = thead && elementChildren(thead).find((node) => node.tagName === 'tr');
	const headerCells = headerRow
		? elementChildren(headerRow).filter((node) =>
				['th', 'td'].includes(node.tagName),
			)
		: [];
	const rows = tbody
		? elementChildren(tbody).filter((node) => node.tagName === 'tr')
		: [];
	const headers = headerCells.map((cell) => textContent(cell).trim());
	const regular =
		headers.length > 0 &&
		rows.length > 0 &&
		rows.every(
			(row) =>
				elementChildren(row).filter((node) =>
					['th', 'td'].includes(node.tagName),
				).length === headers.length,
		);
	return { headers, headerCells, rows, regular, caption };
}

function markColumn(
	cell: Element,
	index: number,
	header: string,
	presentation: NormalizedTablePresentation,
	isHeader: boolean,
): void {
	cell.properties['data-column-index'] = index;
	if (presentation.initiallyHiddenColumns.includes(header)) {
		cell.properties['data-initially-hidden'] = '';
	}
	const kind = isHeader ? 'data' : (presentation.contentKinds[header] ?? 'prose');
	addClass(cell, `table-cell--${kind}`);
	if (presentation.rowHeader === header) addClass(cell, 'table-cell--row-axis');
}

function buildSelector(
	headers: string[],
	presentation: NormalizedTablePresentation,
	frameId: string,
): Element | undefined {
	const essential = new Set(presentation.essentialColumns);
	if (essential.size === 0 || essential.size === headers.length) return undefined;
	const initiallyHidden = new Set(presentation.initiallyHiddenColumns);
	const visibleCount = headers.length - initiallyHidden.size;
	const options = headers.map((header, index) => {
		const inputId = `${frameId}-column-${index}`;
		const locked = essential.has(header);
		const inputProperties: Properties = {
			id: inputId,
			type: 'checkbox',
			checked: locked || !initiallyHidden.has(header),
			disabled: locked || undefined,
			'data-table-column-toggle': '',
			'data-column-index': index,
		};
		return element('label', { className: ['table-column-picker__option'] }, [
			element('input', inputProperties),
			element('span', {}, [text(displayTableHeader(header))]),
			...(locked
				? [
						element(
							'small',
							{ className: ['table-column-picker__locked'] },
							[text('Siempre visible')],
						),
					]
				: []),
		]);
	});

	return element('details', { className: ['table-column-picker'] }, [
		element('summary', {}, [
			text('Columnas: '),
			element(
				'span',
				{ 'data-table-column-count': '', ariaLive: 'polite' },
				[text(`${visibleCount} de ${headers.length}`)],
			),
		]),
		element('fieldset', {}, [
			element('legend', { className: ['sr-only'] }, [text('Columnas visibles')]),
			...options,
		]),
	]);
}

function buildMobileRows(
	headers: string[],
	rows: Element[],
	presentation: NormalizedTablePresentation,
	labelId: string,
): Element | undefined {
	if (
		!presentation.rowHeader ||
		presentation.summaryColumns.length === 0 ||
		headers.length < 5
	) {
		return undefined;
	}
	const rowHeaderIndex = headers.indexOf(presentation.rowHeader);
	const summaryIndexes = presentation.summaryColumns.map((header) =>
		headers.indexOf(header),
	);
	const details = rows.map((row) => {
		const cells = elementChildren(row).filter((node) =>
			['th', 'td'].includes(node.tagName),
		);
		const summaryChildren: ElementContent[] = [
			element(
				'span',
				{ className: ['table-mobile__identity'] },
				cells[rowHeaderIndex].children.map(cloneForMobile),
			),
		];
		for (const index of summaryIndexes) {
			summaryChildren.push(
				element('span', { className: ['table-mobile__summary-value'] }, [
					element('span', { className: ['sr-only'] }, [
						text(`${displayTableHeader(headers[index])}: `),
					]),
					...cells[index].children.map(cloneForMobile),
				]),
			);
		}
		const pairs = headers.map((header, index) =>
			element('div', { className: ['table-mobile__pair'] }, [
				element('dt', {}, [text(displayTableHeader(header))]),
				element('dd', {}, cells[index].children.map(cloneForMobile)),
			]),
		);
		return element('details', { className: ['table-mobile__row'] }, [
			element('summary', {}, summaryChildren),
			element('dl', {}, pairs),
		]);
	});
	return element(
		'div',
		{
			className: ['table-mobile'],
			role: 'region',
			ariaLabelledBy: [labelId],
		},
		details,
	);
}

function buildFrame(
	table: Element,
	presentationInput: ReturnType<typeof parseTableDirectiveComment> | undefined,
	state: TransformState,
): Element {
	const structure = tableStructure(table);
	const source = `${state.sourceFile}: tabla ${state.documentTableOrdinal}`;
	const presentation = normalizeTablePresentation(
		structure.headers,
		presentationInput,
		source,
	);
	const frameId = `research-table-${state.documentTableOrdinal}`;
	const labelId = `${frameId}-caption`;
	const captionText =
		(
			presentation.caption
			?? (structure.caption ? textContent(structure.caption).trim() : '')
		)
		|| `Tabla ${state.sectionTableOrdinal} de la sección ${state.currentHeading}`;
	const hasVisibleCaption = Boolean(presentation.caption || structure.caption);

	addClass(table, 'data-table');
	table.properties['data-column-count'] = structure.headers.length;
	if (!structure.caption) {
		table.children.unshift(
			element('caption', { className: ['sr-only'] }, [text(captionText)]),
		);
	} else {
		addClass(structure.caption, 'sr-only');
	}

	structure.headerCells.forEach((cell, index) => {
		if (cell.tagName === 'td') cell.tagName = 'th';
		cell.properties.scope = 'col';
		markColumn(cell, index, structure.headers[index], presentation, true);
	});

	if (structure.regular) {
		for (const row of structure.rows) {
			const cells = elementChildren(row).filter((node) =>
				['th', 'td'].includes(node.tagName),
			);
			cells.forEach((cell, index) => {
				const header = structure.headers[index];
				if (presentation.rowHeader === header) {
					cell.tagName = 'th';
					cell.properties.scope = 'row';
				}
				markColumn(cell, index, header, presentation, false);
			});
		}
	}

	const selector = structure.regular
		? buildSelector(structure.headers, presentation, frameId)
		: undefined;
	const mobile = structure.regular
		? buildMobileRows(
				structure.headers,
				structure.rows,
				presentation,
				labelId,
			)
		: undefined;
	const isWide = structure.headers.length >= 5 || structure.rows.length >= 12;
	const caption = element(
		'p',
		{
			id: labelId,
			className: hasVisibleCaption ? ['table-caption'] : ['sr-only'],
		},
		[text(captionText)],
	);
	const headerChildren: ElementContent[] = [caption];
	if (selector) headerChildren.push(selector);
	const header = element(
		'div',
		{ className: ['table-frame__header'] },
		headerChildren,
	);
	const scrollProperties: Properties = {
		className: ['table-scroll'],
		'data-table-scroll': '',
		'data-table-label-id': labelId,
	};
	if (isWide) {
		scrollProperties.role = 'region';
		scrollProperties.tabIndex = 0;
		scrollProperties.ariaLabelledBy = [labelId];
	}
	const scroll = element('div', scrollProperties, [table]);
	const classes = ['table-frame'];
	if (isWide) classes.push('table-frame--wide');
	if (selector) classes.push('table-frame--has-selector');
	if (mobile) classes.push('table-frame--has-summary');

	return element(
		'div',
		{
			className: classes,
			'data-table-frame': '',
			'data-table-wide': isWide ? 'true' : 'false',
			'data-table-row-header-index': presentation.rowHeader
				? structure.headers.indexOf(presentation.rowHeader)
				: undefined,
		},
		[header, scroll, ...(mobile ? [mobile] : [])],
	);
}

function previousContentIndex(
	children: RootContent[],
	index: number,
): number | undefined {
	for (let current = index - 1; current >= 0; current--) {
		if (!isWhitespace(children[current])) return current;
	}
	return undefined;
}

function nextContentIndex(
	children: RootContent[],
	index: number,
): number | undefined {
	for (let current = index + 1; current < children.length; current++) {
		if (!isWhitespace(children[current])) return current;
	}
	return undefined;
}

function processParent(parent: Parent, state: TransformState): void {
	const children = parent.children as RootContent[];
	for (let index = 0; index < children.length; index++) {
		const node = children[index];
		if (isComment(node) && isTableDirectiveComment(node.value)) {
			const nextIndex = nextContentIndex(children, index);
			const next = nextIndex === undefined ? undefined : children[nextIndex];
			if (!next || !isElement(next) || next.tagName !== 'table') {
				throw new Error(
					`${state.sourceFile}: directiva ai-sdlc-table sin tabla GFM adyacente`,
				);
			}
			continue;
		}
		if (!isElement(node)) continue;
		if (/^h[2-6]$/.test(node.tagName)) {
			state.currentHeading = textContent(node).trim() || 'Investigación';
			state.sectionTableOrdinal = 0;
		}
		if (node.tagName === 'table') {
			state.sectionTableOrdinal++;
			state.documentTableOrdinal++;
			const previousIndex = previousContentIndex(children, index);
			const previous =
				previousIndex === undefined ? undefined : children[previousIndex];
			const directive =
				previous && isComment(previous) && isTableDirectiveComment(previous.value)
					? parseTableDirectiveComment(
							previous.value,
							`${state.sourceFile}: tabla ${state.documentTableOrdinal}`,
						)
					: undefined;
			const frame = buildFrame(node, directive, state);
			if (directive && previousIndex !== undefined) {
				children.splice(previousIndex, index - previousIndex + 1, frame);
				index = previousIndex;
			} else {
				children[index] = frame;
			}
			continue;
		}
		processParent(node, state);
	}
}

export const rehypeTableFrames: Plugin<[Options], Root> = (options) => {
	return (tree) => {
		processParent(tree, {
			currentHeading: 'Investigación',
			sectionTableOrdinal: 0,
			documentTableOrdinal: 0,
			sourceFile: options.sourceFile,
		});
	};
};
