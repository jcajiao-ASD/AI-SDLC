import { useMemo, useState } from 'preact/hooks';
import {
	resolveStack,
	type CompatibilityRecord,
	type CompatibleAlternative,
	type RecommendationOption,
	type StackCombination,
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

function candidateKeys(option: RecommendationOption): Set<string> {
	return new Set(option.candidates.map((candidate) => candidate.key));
}

function combinationRecords(
	combinations: StackCombination[],
	pick: (combination: StackCombination) => CompatibilityRecord | undefined,
): CompatibilityRecord[] {
	const seen = new Set<string>();
	const records: CompatibilityRecord[] = [];
	for (const combination of combinations) {
		const record = pick(combination);
		if (!record || !record.componentKey) continue;
		const dedupeKey = `${record.agentKey}:${record.componentKey}`;
		if (seen.has(dedupeKey)) continue;
		seen.add(dedupeKey);
		records.push(record);
	}
	return records;
}

function layerConflicts(
	blocked: StackResolution['blocked'],
	keys: Set<string>,
): CompatibilityRecord[] {
	const seen = new Set<string>();
	const records: CompatibilityRecord[] = [];
	for (const combination of blocked) {
		for (const conflict of combination.conflicts) {
			if (!keys.has(conflict.componentKey)) continue;
			const dedupeKey = `${conflict.agentKey}:${conflict.componentKey}`;
			if (seen.has(dedupeKey)) continue;
			seen.add(dedupeKey);
			records.push(conflict);
		}
	}
	return records;
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

function liveAnnouncement(result: StackResolution): string {
	const status = statusLabels[result.status];
	if (result.recommendationState === 'pilot') {
		return `${status}. Requiere piloto comparativo entre ${result.pilotAgents.join(', ')}.`;
	}
	const primaryConflict = result.blocked[0]?.conflicts[0];
	if (primaryConflict) {
		return `${status}. ${primaryConflict.componentLabel}: ${primaryConflict.status}. ${primaryConflict.note}`;
	}
	return `${status}. ${resultHeading(result)}.`;
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

function StackStep({
	index,
	layer,
	title,
	option,
	options,
	onChange,
	source,
	relations,
	alternatives,
	pilotAgents,
}: {
	index: number;
	layer: string;
	title: string;
	option: RecommendationOption;
	options: RecommendationOption[];
	onChange: (value: string) => void;
	source: string;
	relations: CompatibilityRecord[];
	alternatives: CompatibleAlternative[];
	pilotAgents: string[];
}) {
	return (
		<li class="stack-step" data-stack-layer={layer}>
			<div class="stack-step__marker" aria-hidden="true">
				{index}
			</div>
			<div class="stack-step__body">
				<label>
					<span class="stack-step__title">{title}</span>
					<select
						value={option.key}
						onChange={(event) => onChange(event.currentTarget.value)}
					>
						{options.map((candidate) => (
							<option value={candidate.key}>{candidate.label}</option>
						))}
					</select>
				</label>
				<h4>{option.recommendation}</h4>
				<p>{option.reason}</p>
				<p>
					<strong>Límite:</strong> {option.caveat}
				</p>
				<a href={source}>Auditar estudio fuente</a>

				{pilotAgents.length > 0 && (
					<p class="stack-step__conflict" data-conflict-state="pilot">
						Requiere un piloto comparativo entre:{' '}
						<strong>{pilotAgents.join(', ')}</strong>.
					</p>
				)}

				{relations.length > 0 && (
					<ul class="stack-step__relations">
						{relations.map((relation) => (
							<CompatibilityDetail record={relation} />
						))}
					</ul>
				)}

				{alternatives.length > 0 && (
					<div class="stack-step__alternatives">
						<p>Agentes con soporte documentado para este componente</p>
						<ul>
							{alternatives.map((alternative) => (
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
		</li>
	);
}

function StackSummary({
	agent,
	model,
	framework,
	result,
}: {
	agent: RecommendationOption;
	model: RecommendationOption;
	framework: RecommendationOption;
	result: StackResolution;
}) {
	return (
		<aside class="stack-summary" aria-label="Resumen del stack">
			<p class="stack-summary__status">{statusLabels[result.status]}</p>
			<h4>{resultHeading(result)}</h4>

			<dl class="stack-summary__layers">
				<div>
					<dt>Agente</dt>
					<dd>{agent.recommendation}</dd>
				</div>
				<div>
					<dt>Modelo</dt>
					<dd>{model.recommendation}</dd>
				</div>
				<div>
					<dt>Framework</dt>
					<dd>{framework.recommendation}</dd>
				</div>
			</dl>

			{result.recommendationState === 'pilot' && (
				<p>
					Requiere piloto comparativo:{' '}
					<strong>{result.pilotAgents.join(', ')}</strong>.
				</p>
			)}

			{result.recommendationState === 'final' && (
				<ul class="stack-summary__combinations">
					{result.combinations.map((combination) => (
						<li>
							{combination.agentLabel} + {combination.modelLabel} +{' '}
							{combination.frameworkLabel ?? 'sin framework'} —{' '}
							{statusLabels[combination.status]}
						</li>
					))}
				</ul>
			)}

			{result.recommendationState === 'blocked' && (
				<p>Ninguna combinación se presenta como stack final con esta selección.</p>
			)}

			<a href="#stack-detail">Ver detalle completo de compatibilidad</a>
		</aside>
	);
}

function StackDetail({ result }: { result: StackResolution }) {
	return (
		<div
			id="stack-detail"
			class={`stack-result stack-result--${result.status}`}
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
		</div>
	);
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

	const modelKeys = useMemo(() => candidateKeys(model), [model]);
	const frameworkKeys = useMemo(() => candidateKeys(framework), [framework]);

	const modelRelations = useMemo(
		() => [
			...combinationRecords(result.combinations, (c) => c.modelCompatibility),
			...layerConflicts(result.blocked, modelKeys),
		],
		[result, modelKeys],
	);
	const frameworkRelations = useMemo(
		() => [
			...combinationRecords(
				result.combinations,
				(c) => c.frameworkCompatibility,
			),
			...layerConflicts(result.blocked, frameworkKeys),
		],
		[result, frameworkKeys],
	);
	const modelAlternatives = useMemo(
		() => result.alternatives.filter((a) => modelKeys.has(a.componentKey)),
		[result, modelKeys],
	);
	const frameworkAlternatives = useMemo(
		() => result.alternatives.filter((a) => frameworkKeys.has(a.componentKey)),
		[result, frameworkKeys],
	);
	const agentPilotNotice = useMemo(
		() => (result.recommendationState === 'pilot' ? result.pilotAgents : []),
		[result],
	);
	const liveMessage = useMemo(() => liveAnnouncement(result), [result]);

	return (
		<section class="stack-configurator" aria-labelledby="stack-configurator-title">
			<h3 id="stack-configurator-title">Configura el contexto de decisión</h3>
			<div class="sr-only" role="status" aria-live="polite" aria-atomic="true">
				{liveMessage}
			</div>

			<div class="stack-configurator__layout">
				<ol class="stack-flow">
					<StackStep
						index={1}
						layer="agent"
						title="Contexto del agente"
						option={agent}
						options={agentOptions}
						onChange={setAgentKey}
						source={sourceLinks.agent}
						relations={[]}
						alternatives={[]}
						pilotAgents={agentPilotNotice}
					/>
					<StackStep
						index={2}
						layer="model"
						title="Fase del SDLC"
						option={model}
						options={modelOptions}
						onChange={setModelKey}
						source={sourceLinks.model}
						relations={modelRelations}
						alternatives={modelAlternatives}
						pilotAgents={[]}
					/>
					<StackStep
						index={3}
						layer="framework"
						title="Escenario de proceso"
						option={framework}
						options={frameworkOptions}
						onChange={setFrameworkKey}
						source={sourceLinks.framework}
						relations={frameworkRelations}
						alternatives={frameworkAlternatives}
						pilotAgents={[]}
					/>
				</ol>

				<StackSummary agent={agent} model={model} framework={framework} result={result} />
			</div>

			<StackDetail result={result} />
		</section>
	);
}
