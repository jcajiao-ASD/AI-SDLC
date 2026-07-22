import { useState } from 'preact/hooks';

export const agentRecommendations = {
	github: {
		label: 'GitHub es el centro del SDLC',
		tool: 'GitHub Copilot CLI',
		reason: 'Integración nativa issue→PR, gobernanza GitHub y menor entrada mensual comercial comparada.',
		caveat: 'Es una recomendación condicionada: catálogo, créditos y coste efectivo deben revalidarse.',
	},
	ide: {
		label: 'IDE-first, Jira y BYOK',
		tool: 'Cursor',
		reason: 'Prioriza experiencia IDE-first, integración con Jira, BYOK y catálogo frontera nativo.',
		caveat: 'Debe pilotarse con el flujo y políticas reales del equipo.',
	},
	jetbrains: {
		label: 'Ecosistema JetBrains',
		tool: 'Junie CLI',
		reason: 'Se alinea con herramientas y experiencia JetBrains y ofrece modelos adicionales mediante BYOK.',
		caveat: 'GPT-5.6 depende de BYOK en el corte del estudio.',
	},
	open: {
		label: 'Máxima apertura y control de proveedor',
		tool: 'OpenCode',
		reason: 'Software MIT, local-first y acceso a numerosos proveedores mediante BYOK.',
		caveat: 'El software es gratuito, pero el consumo de API y la gobernanza son responsabilidad del equipo.',
	},
	unclear: {
		label: 'Sin ecosistema central claro',
		tool: 'Piloto comparativo',
		reason: 'Comparar Cursor con Junie u OpenCode según IDE, apertura y BYOK evita imponer un ganador universal.',
		caveat: 'La decisión debe basarse en tareas representativas y coste efectivo observado.',
	},
} as const;

type RecommendationKey = keyof typeof agentRecommendations;

export default function RecommendationPicker() {
	const [selected, setSelected] = useState<RecommendationKey>('github');
	const recommendation = agentRecommendations[selected];

	return (
		<section class="picker" aria-labelledby="picker-title">
			<h3 id="picker-title">¿Cuál es el centro operativo de tu equipo?</h3>
			<label>
				Contexto
				<select
					value={selected}
					onChange={(event) => setSelected(event.currentTarget.value as RecommendationKey)}
				>
					{Object.entries(agentRecommendations).map(([key, item]) => (
						<option value={key}>{item.label}</option>
					))}
				</select>
			</label>
			<div class="picker__result" aria-live="polite">
				<p class="picker__label">Recomendación condicionada</p>
				<h4>{recommendation.tool}</h4>
				<p>{recommendation.reason}</p>
				<p><strong>Límite:</strong> {recommendation.caveat}</p>
			</div>
		</section>
	);
}
