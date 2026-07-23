import { useEffect, useMemo, useState } from 'preact/hooks';
import {
	applyCatalogState,
	catalogFacetValues,
	catalogFilterFields,
	defaultCatalogState,
	isDefaultCatalogState,
	parseCatalogSearch,
	serializeCatalogSearch,
	type CatalogFilterField,
	type CatalogItem,
	type CatalogState,
} from '../lib/catalog';

export type { CatalogItem };

interface Props {
	items: CatalogItem[];
}

const filterFieldLabels: Record<CatalogFilterField, string> = {
	category: 'Categoría',
	status: 'Estado',
	year: 'Año de corte',
	decision: 'Tipo de decisión',
};

function writeLocationState(state: CatalogState, mode: 'push' | 'replace') {
	const url = `${window.location.pathname}${serializeCatalogSearch(state)}${window.location.hash}`;
	if (mode === 'push') {
		window.history.pushState(null, '', url);
	} else {
		window.history.replaceState(null, '', url);
	}
}

export default function CatalogFilter({ items }: Props) {
	// El primer render debe coincidir con el HTML estático (sin JS ni URL
	// aplicada); el estado de la URL se adopta después del montaje para que
	// Preact lo aplique como una actualización normal, no como hidratación.
	const [state, setState] = useState<CatalogState>(defaultCatalogState);

	useEffect(() => {
		setState(parseCatalogSearch(window.location.search));
		const handlePopState = () => setState(parseCatalogSearch(window.location.search));
		window.addEventListener('popstate', handlePopState);
		return () => window.removeEventListener('popstate', handlePopState);
	}, []);

	function commit(next: CatalogState, mode: 'push' | 'replace') {
		setState(next);
		writeLocationState(next, mode);
	}

	function updateSearch(value: string) {
		commit({ ...state, q: value }, 'replace');
	}

	function updateFilter(field: CatalogFilterField, value: string) {
		commit({ ...state, [field]: value }, 'push');
	}

	function updateSort(value: CatalogState['sort']) {
		commit({ ...state, sort: value }, 'push');
	}

	function clearFilter(field: CatalogFilterField) {
		commit({ ...state, [field]: '' }, 'push');
	}

	function clearSearch() {
		commit({ ...state, q: '' }, 'push');
	}

	function clearAll() {
		commit(defaultCatalogState(), 'push');
	}

	const results = useMemo(() => applyCatalogState(items, state), [items, state]);
	const trimmedQuery = state.q.trim();
	const activeFilters = catalogFilterFields.filter((field) => state[field]);
	const hasActiveCriteria = !isDefaultCatalogState(state);
	const resultsLabel = results.length === 1 ? 'investigación visible' : 'investigaciones visibles';
	const activeSummary = [
		...(trimmedQuery ? [`«${trimmedQuery}»`] : []),
		...activeFilters.map((field) => `${filterFieldLabels[field]}: ${state[field]}`),
	].join(', ');

	return (
		<div class="catalog">
			<div class="filters" aria-label="Filtros del catálogo">
				<label class="filters__search">
					Buscar
					<input
						type="search"
						value={state.q}
						placeholder="Título, resumen o metadatos"
						onInput={(event) => updateSearch(event.currentTarget.value)}
					/>
				</label>
				<label>
					Categoría
					<select
						value={state.category}
						onChange={(event) => updateFilter('category', event.currentTarget.value)}
					>
						<option value="">Todas</option>
						{catalogFacetValues(items, 'category').map((value) => (
							<option value={value}>{value}</option>
						))}
					</select>
				</label>
				<label>
					Estado
					<select
						value={state.status}
						onChange={(event) => updateFilter('status', event.currentTarget.value)}
					>
						<option value="">Todos</option>
						{catalogFacetValues(items, 'status').map((value) => (
							<option value={value}>{value}</option>
						))}
					</select>
				</label>
				<label>
					Año de corte
					<select
						value={state.year}
						onChange={(event) => updateFilter('year', event.currentTarget.value)}
					>
						<option value="">Todos</option>
						{catalogFacetValues(items, 'year').map((value) => (
							<option value={value}>{value}</option>
						))}
					</select>
				</label>
				<label>
					Tipo de decisión
					<select
						value={state.decision}
						onChange={(event) => updateFilter('decision', event.currentTarget.value)}
					>
						<option value="">Todos</option>
						{catalogFacetValues(items, 'decision').map((value) => (
							<option value={value}>{value}</option>
						))}
					</select>
				</label>
				<label>
					Ordenar por
					<select
						value={state.sort}
						onChange={(event) => updateSort(event.currentTarget.value as CatalogState['sort'])}
					>
						<option value="relevancia" disabled={!trimmedQuery}>
							Relevancia
						</option>
						<option value="fecha">Fecha de corte</option>
						<option value="titulo">Título</option>
					</select>
				</label>
			</div>

			{hasActiveCriteria && (
				<div class="catalog__chips" aria-label="Criterios activos">
					{trimmedQuery && (
						<button type="button" class="chip" aria-label={`Quitar búsqueda: ${trimmedQuery}`} onClick={clearSearch}>
							<span aria-hidden="true">Búsqueda: «{trimmedQuery}» ×</span>
						</button>
					)}
					{activeFilters.map((field) => (
						<button
							type="button"
							class="chip"
							aria-label={`Quitar filtro ${filterFieldLabels[field]}: ${state[field]}`}
							onClick={() => clearFilter(field)}
						>
							<span aria-hidden="true">
								{filterFieldLabels[field]}: {state[field]} ×
							</span>
						</button>
					))}
					<button type="button" class="catalog__clear" onClick={clearAll}>
						Limpiar filtros
					</button>
				</div>
			)}

			<p class="catalog__count" aria-live="polite">
				<strong>{results.length}</strong> de {items.length} {resultsLabel}
			</p>

			{results.length === 0 ? (
				<div class="catalog__empty" role="status">
					<p>
						Ningún estudio coincide con {activeSummary || 'los criterios activos'}.
					</p>
					<button type="button" class="button-link button-link--secondary" onClick={clearAll}>
						Limpiar filtros
					</button>
				</div>
			) : (
				<div class="catalog__grid">
					{results.map((item) => (
						<a class="catalog-card" href={item.href} key={item.id}>
							<p class="catalog-card__meta">
								{item.category} · {item.status} · {item.year}
							</p>
							<h2>{item.title}</h2>
							<p>{item.summary}</p>
						</a>
					))}
				</div>
			)}
		</div>
	);
}
