export const catalogSortModes = ['relevancia', 'fecha', 'titulo'] as const;
export type CatalogSortMode = (typeof catalogSortModes)[number];

export const catalogFilterFields = ['category', 'status', 'year', 'decision'] as const;
export type CatalogFilterField = (typeof catalogFilterFields)[number];

export const catalogParamKeys = [
	'q',
	'category',
	'status',
	'year',
	'decision',
	'sort',
] as const;
export type CatalogParamKey = (typeof catalogParamKeys)[number];

export interface CatalogItem {
	id: string;
	title: string;
	summary: string;
	category: string;
	status: string;
	year: string;
	decisionType: string;
	cutoffDate: string;
	href: string;
}

export interface CatalogState {
	q: string;
	category: string;
	status: string;
	year: string;
	decision: string;
	sort: CatalogSortMode;
}

const facetFieldByFilterField: Record<CatalogFilterField, keyof CatalogItem> = {
	category: 'category',
	status: 'status',
	year: 'year',
	decision: 'decisionType',
};

export function defaultCatalogState(): CatalogState {
	return { q: '', category: '', status: '', year: '', decision: '', sort: 'relevancia' };
}

export function isDefaultCatalogState(state: CatalogState): boolean {
	const defaults = defaultCatalogState();
	return catalogParamKeys.every((key) => state[key] === defaults[key]);
}

export function normalizeText(value: string): string {
	return value
		.normalize('NFD')
		.replace(/\p{Diacritic}/gu, '')
		.toLowerCase()
		.trim();
}

function catalogSearchableText(item: CatalogItem): string {
	return `${item.title} ${item.summary} ${item.category} ${item.status} ${item.year} ${item.decisionType}`;
}

export function catalogFacetValues(
	items: CatalogItem[],
	field: CatalogFilterField,
): string[] {
	const source = facetFieldByFilterField[field];
	return [...new Set(items.map((item) => String(item[source])))].sort((a, b) =>
		a.localeCompare(b, 'es'),
	);
}

export function filterCatalogItems(
	items: CatalogItem[],
	state: CatalogState,
): CatalogItem[] {
	const query = normalizeText(state.q);
	return items.filter((item) => {
		if (state.category && item.category !== state.category) return false;
		if (state.status && item.status !== state.status) return false;
		if (state.year && item.year !== state.year) return false;
		if (state.decision && item.decisionType !== state.decision) return false;
		if (!query) return true;
		return normalizeText(catalogSearchableText(item)).includes(query);
	});
}

function relevanceScore(item: CatalogItem, normalizedQuery: string): number {
	if (!normalizedQuery) return 0;
	if (normalizeText(item.title).includes(normalizedQuery)) return 3;
	if (normalizeText(item.summary).includes(normalizedQuery)) return 2;
	const metadata = `${item.category} ${item.status} ${item.year} ${item.decisionType}`;
	if (normalizeText(metadata).includes(normalizedQuery)) return 1;
	return 0;
}

function byTitleThenId(a: CatalogItem, b: CatalogItem): number {
	return a.title.localeCompare(b.title, 'es') || a.id.localeCompare(b.id);
}

function byDateDescThenTitle(a: CatalogItem, b: CatalogItem): number {
	return b.cutoffDate.localeCompare(a.cutoffDate) || byTitleThenId(a, b);
}

export function effectiveCatalogSort(state: CatalogState): CatalogSortMode {
	if (state.sort === 'relevancia' && !state.q.trim()) return 'fecha';
	return state.sort;
}

export function sortCatalogItems(
	items: CatalogItem[],
	state: CatalogState,
): CatalogItem[] {
	const mode = effectiveCatalogSort(state);
	if (mode === 'titulo') {
		return [...items].sort(byTitleThenId);
	}
	if (mode === 'relevancia') {
		const query = normalizeText(state.q);
		return [...items].sort(
			(a, b) => relevanceScore(b, query) - relevanceScore(a, query) || byTitleThenId(a, b),
		);
	}
	return [...items].sort(byDateDescThenTitle);
}

export function applyCatalogState(
	items: CatalogItem[],
	state: CatalogState,
): CatalogItem[] {
	return sortCatalogItems(filterCatalogItems(items, state), state);
}

export function activeCatalogFilters(
	state: CatalogState,
): Array<{ field: CatalogFilterField; value: string }> {
	return catalogFilterFields
		.filter((field) => state[field])
		.map((field) => ({ field, value: state[field] }));
}

export function parseCatalogSearch(search: string): CatalogState {
	const params = new URLSearchParams(search);
	const state = defaultCatalogState();
	for (const key of catalogParamKeys) {
		if (!params.has(key)) continue;
		const raw = (params.get(key) ?? '').trim();
		if (key === 'sort') {
			state.sort = (catalogSortModes as readonly string[]).includes(raw)
				? (raw as CatalogSortMode)
				: defaultCatalogState().sort;
			continue;
		}
		state[key] = raw;
	}
	return state;
}

export function serializeCatalogSearch(state: CatalogState): string {
	const defaults = defaultCatalogState();
	const params = new URLSearchParams();
	for (const key of catalogParamKeys) {
		const value = state[key];
		if (value && value !== defaults[key]) params.set(key, value);
	}
	const serialized = params.toString();
	return serialized ? `?${serialized}` : '';
}
