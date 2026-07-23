import { useState } from 'preact/hooks';
import {
	ceremonyModel,
	edgeKey,
	type CeremonyEdge,
	type CeremonyExampleId,
	type CeremonyNodeId,
} from '../lib/ceremony';

const NODE_X: Record<CeremonyNodeId, number> = {
	explore: 60,
	propose: 196,
	checkpoint: 332,
	apply: 468,
	sync: 604,
	archive: 740,
};
const NODE_Y = 100;
const NODE_R = 26;

function forwardEdgeGeometry(edge: CeremonyEdge) {
	const x1 = NODE_X[edge.from] + NODE_R;
	const x2 = NODE_X[edge.to] - NODE_R;
	const d = `M ${x1} ${NODE_Y} L ${x2} ${NODE_Y}`;
	const arrow = `${x2},${NODE_Y} ${x2 - 14},${NODE_Y - 6} ${x2 - 14},${NODE_Y + 6}`;
	return { d, arrow };
}

function returnEdgeGeometry(edge: CeremonyEdge) {
	const x1 = NODE_X[edge.from];
	const x2 = NODE_X[edge.to];
	const top = NODE_Y - NODE_R;
	const arcY = 24;
	const d = `M ${x1} ${top} C ${x1} ${arcY} ${x2} ${arcY} ${x2} ${top}`;
	const arrow = `${x2},${top} ${x2 - 6},${top - 14} ${x2 + 6},${top - 14}`;
	return { d, arrow };
}

export default function CeremonyDiagram() {
	const [activeExampleId, setActiveExampleId] = useState<CeremonyExampleId>('normal');
	const activeExample =
		ceremonyModel.examples.find((example) => example.id === activeExampleId) ??
		ceremonyModel.examples[0];
	const activeEdgeKeys = new Set(activeExample.pathEdgeKeys);
	const reachedNodeIds = new Set(activeExample.stepIds);

	return (
		<div class="ceremony-diagram">
			<div class="ceremony-diagram__toggle" aria-label="Ejemplo de ceremonia">
				{ceremonyModel.examples.map((example) => (
					<button
						key={example.id}
						type="button"
						aria-pressed={example.id === activeExampleId}
						class={
							'ceremony-diagram__toggle-button' +
							(example.id === activeExampleId ? ' ceremony-diagram__toggle-button--active' : '')
						}
						onClick={() => setActiveExampleId(example.id)}
					>
						{example.label}
					</button>
				))}
			</div>

			<svg
				class="ceremony-diagram__svg"
				viewBox="0 0 800 170"
				aria-hidden="true"
				focusable="false"
			>
				{ceremonyModel.edges.map((edge) => {
					const key = edgeKey(edge);
					const isActive = activeEdgeKeys.has(key);
					const geometry = edge.kind === 'return' ? returnEdgeGeometry(edge) : forwardEdgeGeometry(edge);
					return (
						<g key={key}>
							<path
								d={geometry.d}
								class={
									'ceremony-diagram__edge' +
									(edge.kind === 'return' ? ' ceremony-diagram__edge--return' : '') +
									(isActive ? ' ceremony-diagram__edge--active' : '')
								}
							/>
							<polygon
								points={geometry.arrow}
								class={
									'ceremony-diagram__edge-arrow' + (isActive ? ' ceremony-diagram__edge-arrow--active' : '')
								}
							/>
						</g>
					);
				})}
				{ceremonyModel.nodes.map((node, index) => (
					<g
						key={node.id}
						class={
							'ceremony-diagram__node' +
							(reachedNodeIds.has(node.id) ? ' ceremony-diagram__node--reached' : ' ceremony-diagram__node--unreached')
						}
						transform={`translate(${NODE_X[node.id]}, ${NODE_Y})`}
					>
						<circle r={NODE_R} />
						<text text-anchor="middle" dominant-baseline="central" font-size="18" font-weight="700">
							{index + 1}
						</text>
						<text text-anchor="middle" y={NODE_R + 20} font-size="14">
							{node.label}
						</text>
					</g>
				))}
			</svg>

			<p class="ceremony-diagram__example-detail">{activeExample.detail}</p>

			<div class="ceremony-diagram__examples">
				{ceremonyModel.examples.map((example) => (
					<section key={example.id} class="ceremony-diagram__example">
						<h4>{example.label}</h4>
						<ol class="ceremony-diagram__steps">
							{example.stepIds.map((stepId) => {
								const node = ceremonyModel.nodes.find((item) => item.id === stepId)!;
								return (
									<li key={stepId}>
										<details>
											<summary>
												{node.label}
												{node.profileBadge && (
													<span class="ceremony-diagram__badge">{node.profileBadge}</span>
												)}
											</summary>
											<p>{node.description}</p>
											<pre>
												<code>{node.command}</code>
											</pre>
										</details>
									</li>
								);
							})}
						</ol>
					</section>
				))}
			</div>
		</div>
	);
}
