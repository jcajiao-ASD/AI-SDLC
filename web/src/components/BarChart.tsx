import * as Plot from '@observablehq/plot';
import { useEffect, useRef } from 'preact/hooks';

export interface BarDatum {
	label: string;
	value: number;
	detail?: string;
}

interface Props {
	data: BarDatum[];
	title: string;
	description: string;
	max?: number;
}

export default function BarChart({ data, title, description, max = 100 }: Props) {
	const host = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!host.current) return;
		const rootStyles = getComputedStyle(document.documentElement);
		const dataPrimary = rootStyles.getPropertyValue('--color-data-primary').trim();
		const dataLabel = rootStyles.getPropertyValue('--color-data-label').trim();
		const dataFont = rootStyles.getPropertyValue('--font-data').trim();
		const chart = Plot.plot({
			ariaLabel: `${title}. ${description}`,
			height: Math.max(260, data.length * 54),
			marginLeft: 150,
			style: { fontFamily: dataFont },
			x: { domain: [0, max], grid: true, label: 'Puntuación' },
			y: { label: null },
			color: { legend: false },
			marks: [
				Plot.barX(data, {
					x: 'value',
					y: 'label',
					sort: { y: '-x' },
					fill: dataPrimary,
					tip: true,
					title: (datum) => `${datum.label}: ${datum.value}${datum.detail ? ` · ${datum.detail}` : ''}`,
				}),
				Plot.text(data, {
					x: 'value',
					y: 'label',
					text: (datum) => String(datum.value),
					dx: 16,
					fill: dataLabel,
					fontWeight: 700,
				}),
			],
		});
		host.current.replaceChildren(chart);
		return () => chart.remove();
	}, [data, description, max, title]);

	if (data.length === 0) {
		return <div class="chart-host" role="status">Datos no disponibles para esta visualización.</div>;
	}

	return <div ref={host} class="chart-host" role="img" aria-label={`${title}. ${description}`} />;
}
