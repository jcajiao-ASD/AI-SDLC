import { useState } from 'preact/hooks';
import type { RecommendationOption } from '../lib/stack';

interface Props {
	options: RecommendationOption[];
	defaultKey?: string;
}

export default function RecommendationPicker({
	options,
	defaultKey = 'github',
}: Props) {
	const initial = options.find(({ key }) => key === defaultKey) ?? options[0];
	const [selected, setSelected] = useState(initial.key);
	const recommendation =
		options.find(({ key }) => key === selected) ?? initial;

	return (
		<section class="picker" aria-labelledby="picker-title">
			<h3 id="picker-title">¿Cuál es el centro operativo de tu equipo?</h3>
			<label>
				Contexto
				<select
					value={selected}
					onChange={(event) => setSelected(event.currentTarget.value)}
				>
					{options.map((item) => (
						<option value={item.key}>{item.label}</option>
					))}
				</select>
			</label>
			<div class="picker__result" aria-live="polite">
				<p class="picker__label">Recomendación condicionada</p>
				<h4>{recommendation.recommendation}</h4>
				<p>{recommendation.reason}</p>
				<p><strong>Límite:</strong> {recommendation.caveat}</p>
			</div>
		</section>
	);
}
