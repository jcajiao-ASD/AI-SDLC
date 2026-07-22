import { useMemo, useState } from 'preact/hooks';

interface Band {
	from: number;
	to: number;
	leader: string;
	note?: string;
}

interface Props {
	bands: Band[];
}

export function winnerAtWeight(weight: number, bands: Band[]): Band {
	return bands.find((band) => weight >= band.from && weight <= band.to) ?? bands[bands.length - 1];
}

export default function SensitivityExplorer({ bands }: Props) {
	const [weight, setWeight] = useState(65);
	const winner = useMemo(() => winnerAtWeight(weight, bands), [bands, weight]);

	return (
		<section class="sensitivity" aria-labelledby="sensitivity-title">
			<h3 id="sensitivity-title">Explora el peso agregado de adopción</h3>
			<label>
				<span>Peso de adopción: <strong>{weight}%</strong></span>
				<input
					type="range"
					min="0"
					max="100"
					value={weight}
					onInput={(event) => setWeight(Number(event.currentTarget.value))}
				/>
			</label>
			<div class="sensitivity__scale" aria-hidden="true">
				{bands.map((band) => (
					<span
						style={{ width: `${band.to - band.from}%` }}
						title={`${band.from}%–${band.to}%: ${band.leader}`}
					>{band.leader}</span>
				))}
			</div>
			<p aria-live="polite">
				Con <strong>{weight}%</strong> de peso de adopción lidera <strong>{winner.leader}</strong>.
				{winner.note ? ` ${winner.note}` : ''}
			</p>
		</section>
	);
}
