import { useEffect, useMemo, useState } from 'preact/hooks';
import type { VisualizationModel } from '../lib/visualization';

interface Props {
	model: VisualizationModel;
}

interface SelectDetail {
	group: string;
	key: string | null;
}

const selectEventName = 'datavis:select';

function dispatchSelect(group: string, key: string | null): void {
	document.dispatchEvent(
		new CustomEvent<SelectDetail>(selectEventName, { detail: { group, key } }),
	);
}

function barWidth(value: number, domain: [number, number]): number {
	const [min, max] = domain;
	if (max <= min) {
		throw new Error('El dominio de la visualización es inválido');
	}
	return Math.max(0, Math.min(100, ((value - min) / (max - min)) * 100));
}

export default function BarChart({ model }: Props) {
	const { groupId, title, description, unit, domain, data } = model;
	const [selectedKey, setSelectedKey] = useState<string | null>(null);
	const [focusedIndex, setFocusedIndex] = useState(0);

	useEffect(() => {
		function onSelect(event: Event) {
			const detail = (event as CustomEvent<SelectDetail>).detail;
			if (!detail || detail.group !== groupId) return;
			setSelectedKey((current) => (current === detail.key ? current : detail.key));
		}
		document.addEventListener(selectEventName, onSelect);
		return () => document.removeEventListener(selectEventName, onSelect);
	}, [groupId]);

	const widths = useMemo(() => {
		try {
			return { values: data.map((datum) => barWidth(datum.value, domain)), error: undefined };
		} catch (error) {
			return { values: [], error: error instanceof Error ? error.message : String(error) };
		}
	}, [data, domain]);

	function select(key: string, index: number) {
		setSelectedKey((current) => (current === key ? null : key));
		setFocusedIndex(index);
		dispatchSelect(groupId, selectedKey === key ? null : key);
	}

	function focusRow(event: KeyboardEvent, index: number) {
		setFocusedIndex(index);
		(event.currentTarget as HTMLElement)
			.closest('ul')
			?.querySelectorAll<HTMLButtonElement>('button')
			[index]?.focus();
	}

	function onKeyDown(event: KeyboardEvent, index: number) {
		if (event.key === 'ArrowDown') {
			event.preventDefault();
			focusRow(event, Math.min(data.length - 1, index + 1));
		} else if (event.key === 'ArrowUp') {
			event.preventDefault();
			focusRow(event, Math.max(0, index - 1));
		} else if (event.key === 'Home') {
			event.preventDefault();
			focusRow(event, 0);
		} else if (event.key === 'End') {
			event.preventDefault();
			focusRow(event, data.length - 1);
		}
	}

	if (data.length === 0) {
		return (
			<div class="chart-host" role="status">
				Datos no disponibles para esta visualización.
			</div>
		);
	}

	if (widths.error) {
		return (
			<div class="chart-host" role="alert">
				No se pudo generar la gráfica ({widths.error}). Consulta la tabla asociada para los
				valores.
			</div>
		);
	}

	const selectedDatum = data.find((datum) => datum.key === selectedKey);

	return (
		<div class="chart-host" data-viz-group={groupId}>
			<ul
				class="chart-rows"
				role="listbox"
				aria-label={`${title}. ${description}`}
				aria-describedby={`${groupId}-chart-hint`}
			>
				{data.map((datum, index) => (
					<li key={datum.key} role="presentation">
						<button
							type="button"
							role="option"
							aria-selected={datum.key === selectedKey}
							tabIndex={index === focusedIndex ? 0 : -1}
							data-row-key={datum.key}
							class={
								'chart-row' +
								(datum.key === selectedKey ? ' chart-row--selected' : '') +
								(datum.isLeader ? ' chart-row--leader' : '')
							}
							onClick={() => select(datum.key, index)}
							onKeyDown={(event) => onKeyDown(event, index)}
						>
							<span class="chart-row__label">
								{datum.label}
								{datum.isLeader && <span class="chart-row__badge">Líder</span>}
								{datum.key === selectedKey && (
									<span class="chart-row__badge chart-row__badge--selection">Seleccionado</span>
								)}
							</span>
							<span class="chart-row__track">
								<span class="chart-row__fill" style={{ width: `${widths.values[index]}%` }} />
							</span>
							<span class="chart-row__value">
								{datum.value} {unit}
								{datum.detail ? ` · ${datum.detail}` : ''}
							</span>
						</button>
					</li>
				))}
			</ul>
			<p id={`${groupId}-chart-hint`} class="chart-hint">
				Activa un dato con teclado o puntero para explorarlo; la selección es exploratoria y no
				cambia la recomendación.
			</p>
			<div class="sr-only" role="status" aria-live="polite">
				{selectedDatum
					? `Seleccionado: ${selectedDatum.label}, ${selectedDatum.value} ${unit}${
							selectedDatum.isLeader ? ', líder documentado' : ''
						}.`
					: ''}
			</div>
		</div>
	);
}
