import { useMemo, useState } from 'preact/hooks';

export interface CatalogItem {
	id: string;
	title: string;
	summary: string;
	category: string;
	status: string;
	year: string;
	decisionType: string;
	href: string;
}

interface Props {
	items: CatalogItem[];
}

export default function CatalogFilter({ items }: Props) {
	const [category, setCategory] = useState('');
	const [status, setStatus] = useState('');
	const [year, setYear] = useState('');
	const [decision, setDecision] = useState('');

	const filtered = useMemo(
		() =>
			items.filter(
				(item) =>
					(!category || item.category === category) &&
					(!status || item.status === status) &&
					(!year || item.year === year) &&
					(!decision || item.decisionType === decision),
			),
		[category, decision, items, status, year],
	);

	const options = (field: keyof CatalogItem) =>
		[...new Set(items.map((item) => item[field]))].sort((a, b) =>
			String(a).localeCompare(String(b), 'es'),
		);

	return (
		<div class="catalog">
			<div class="filters" aria-label="Filtros del catálogo">
				<label>
					Categoría
					<select value={category} onChange={(event) => setCategory(event.currentTarget.value)}>
						<option value="">Todas</option>
						{options('category').map((value) => <option value={value}>{value}</option>)}
					</select>
				</label>
				<label>
					Estado
					<select value={status} onChange={(event) => setStatus(event.currentTarget.value)}>
						<option value="">Todos</option>
						{options('status').map((value) => <option value={value}>{value}</option>)}
					</select>
				</label>
				<label>
					Año de corte
					<select value={year} onChange={(event) => setYear(event.currentTarget.value)}>
						<option value="">Todos</option>
						{options('year').map((value) => <option value={value}>{value}</option>)}
					</select>
				</label>
				<label>
					Tipo de decisión
					<select value={decision} onChange={(event) => setDecision(event.currentTarget.value)}>
						<option value="">Todos</option>
						{options('decisionType').map((value) => <option value={value}>{value}</option>)}
					</select>
				</label>
			</div>
			<p aria-live="polite"><strong>{filtered.length}</strong> investigaciones visibles</p>
			<div class="catalog__grid">
				{filtered.map((item) => (
					<article class="catalog-card" key={item.id}>
						<p class="catalog-card__meta">{item.category} · {item.status} · {item.year}</p>
						<h2><a href={item.href}>{item.title}</a></h2>
						<p>{item.summary}</p>
					</article>
				))}
			</div>
		</div>
	);
}
