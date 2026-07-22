import { useMemo, useState } from 'preact/hooks';
import {
	resolveStack,
	type CompatibilityRecord,
	type RecommendationOption,
	type StackResolution,
} from '../lib/stack';

interface SourceLinks {
	agent: string;
	model: string;
	framework: string;
}

interface Props {
	agentOptions: RecommendationOption[];
	modelOptions: RecommendationOption[];
	frameworkOptions: RecommendationOption[];
	modelCompatibility: CompatibilityRecord[];
	frameworkCompatibility: CompatibilityRecord[];
	defaults: {
		agent: string;
		model: string;
		framework: string;
	};
	sourceLinks: SourceLinks;
}

const statusLabels: Record<StackResolution['status'], string> = {
	verificado: 'Stack verificado',
	'verificado-condicionado': 'Stack verificado con condiciones',
	incompatible: 'Combinación incompatible',
	'no-confirmado': 'Compatibilidad no confirmada',
};

function selectedOption(
	options: RecommendationOption[],
	key: string,
): RecommendationOption {
	return options.find((option) => option.key === key) ?? options[0];
}

function LayerCard({
	title,
	option,
	source,
}: {
	title: string;
	option: RecommendationOption;
	source: string;
}) {
	return (
		<article class="stack-layer">
			<p class="stack-layer__label">{title}</p>
			<h4>{option.recommendation}</h4>
			<p>{option.reason}</p>
			<p><strong>Límite:</strong> {option.caveat}</p>
			<a href={source}>Auditar estudio fuente</a>
		</article>
	);
}

function CompatibilityDetail({ record }: { record: CompatibilityRecord }) {
	return (
		<li>
			<strong>{record.componentLabel}:</strong> {record.status}. {record.mechanism}.
			{' '}Verificado el {record.verifiedAt}.{' '}
			{record.source && <a href={record.source}>Fuente oficial</a>}
		</li>
	);
}

export function resultHeading(result: StackResolution): string {
	if (result.recommendationState === 'pilot') {
		return 'La selección requiere un piloto comparativo';
	}
	if (result.recommendationState === 'blocked') {
		return 'No hay un stack verificable con estas selecciones';
	}
	return result.combinations.length === 1
		? 'Stack compatible documentado'
		: 'Stacks compatibles documentados';
}

export default function StackConfigurator({
	agentOptions,
	modelOptions,
	frameworkOptions,
	modelCompatibility,
	frameworkCompatibility,
	defaults,
	sourceLinks,
}: Props) {
	const [agentKey, setAgentKey] = useState(defaults.agent);
	const [modelKey, setModelKey] = useState(defaults.model);
	const [frameworkKey, setFrameworkKey] = useState(defaults.framework);

	const agent = selectedOption(agentOptions, agentKey);
	const model = selectedOption(modelOptions, modelKey);
	const framework = selectedOption(frameworkOptions, frameworkKey);
	const result = useMemo(
		() =>
			resolveStack(
				agent,
				model,
				framework,
				modelCompatibility,
				frameworkCompatibility,
			),
		[
			agent,
			model,
			framework,
			modelCompatibility,
			frameworkCompatibility,
		],
	);

	return (
		<section class="stack-configurator" aria-labelledby="stack-configurator-title">
			<h3 id="stack-configurator-title">Configura el contexto de decisión</h3>
			<div class="stack-configurator__controls">
				<label>
					Contexto del agente
					<select
						value={agentKey}
						onChange={(event) => setAgentKey(event.currentTarget.value)}
					>
						{agentOptions.map((option) => (
							<option value={option.key}>{option.label}</option>
						))}
					</select>
				</label>
				<label>
					Fase del SDLC
					<select
						value={modelKey}
						onChange={(event) => setModelKey(event.currentTarget.value)}
					>
						{modelOptions.map((option) => (
							<option value={option.key}>{option.label}</option>
						))}
					</select>
				</label>
				<label>
					Escenario de proceso
					<select
						value={frameworkKey}
						onChange={(event) => setFrameworkKey(event.currentTarget.value)}
					>
						{frameworkOptions.map((option) => (
							<option value={option.key}>{option.label}</option>
						))}
					</select>
				</label>
			</div>

			<div class="stack-layer-grid">
				<LayerCard title="Agente" option={agent} source={sourceLinks.agent} />
				<LayerCard title="Modelo" option={model} source={sourceLinks.model} />
				<LayerCard
					title="Capa de especificación/proceso"
					option={framework}
					source={sourceLinks.framework}
				/>
			</div>

			<div
				class={`stack-result stack-result--${result.status}`}
				aria-live="polite"
				aria-atomic="true"
			>
				<p class="stack-result__status">{statusLabels[result.status]}</p>
				<h4>{resultHeading(result)}</h4>

				{result.recommendationState === 'pilot' && (
					<p>
						El estudio no establece un ganador fuera de un ecosistema central.
						Evalúa: <strong>{result.pilotAgents.join(', ')}</strong>.
					</p>
				)}

				{result.combinations.map((combination) => (
					<article class="stack-combination">
						<h5>
							{combination.agentLabel} + {combination.modelLabel} +{' '}
							{combination.frameworkLabel ?? 'sin framework'}
						</h5>
						<p>
							Estado: <strong>{statusLabels[combination.status]}</strong>
						</p>
						<ul>
							<CompatibilityDetail record={combination.modelCompatibility} />
							{combination.frameworkCompatibility && (
								<CompatibilityDetail
									record={combination.frameworkCompatibility}
								/>
							)}
						</ul>
					</article>
				))}

				{result.recommendationState === 'blocked' && (
					<>
						<p>
							Las recomendaciones de cada capa se conservan, pero la
							combinación no se presenta como final.
						</p>
						{result.blocked.flatMap((combination) =>
							combination.conflicts.map((conflict) => (
								<p>
									<strong>{combination.agentLabel} ↔ {conflict.componentLabel}:</strong>{' '}
									{conflict.status}. {conflict.note}
								</p>
							)),
						)}
					</>
				)}

				{result.alternatives.length > 0 && (
					<div>
						<h5>Agentes con soporte documentado para la capa conflictiva</h5>
						<ul>
							{result.alternatives.map((alternative) => (
								<li>
									<strong>{alternative.agentLabel}</strong> con{' '}
									{alternative.componentLabel}: {alternative.status},{' '}
									{alternative.mechanism}.
								</li>
							))}
						</ul>
					</div>
				)}
			</div>
		</section>
	);
}
