// Contenido derivado de research/OpenSpec.md (perfil core: líneas ~146-176;
// tutorial brownfield: líneas ~402-480). Mantener en sincronía si ese estudio
// cambia de versión o de comandos documentados.

export type CeremonyNodeId =
	| 'explore'
	| 'propose'
	| 'checkpoint'
	| 'apply'
	| 'sync'
	| 'archive';

export interface CeremonyNode {
	id: CeremonyNodeId;
	label: string;
	command: string;
	description: string;
	profileBadge?: string;
}

export interface CeremonyEdge {
	from: CeremonyNodeId;
	to: CeremonyNodeId;
	kind: 'forward' | 'return';
}

export type CeremonyExampleId = 'normal' | 'solicitud-de-cambios';

export interface CeremonyExample {
	id: CeremonyExampleId;
	label: string;
	detail: string;
	stepIds: CeremonyNodeId[];
	pathEdgeKeys: string[];
}

export interface CeremonyModel {
	nodes: CeremonyNode[];
	edges: CeremonyEdge[];
	examples: CeremonyExample[];
}

export function edgeKey(edge: Pick<CeremonyEdge, 'from' | 'to'>): string {
	return `${edge.from}->${edge.to}`;
}

export const ceremonyModel: CeremonyModel = {
	nodes: [
		{
			id: 'explore',
			label: 'Explore',
			command:
				'Usa la skill /openspec-explore para analizar cómo añadir rate limiting al API público. No edites archivos.',
			description: 'Investiga y conversa; no crea artefactos ni código.',
		},
		{
			id: 'propose',
			label: 'Propose',
			command:
				'Usa la skill /openspec-propose para crear el cambio add-public-api-rate-limiting a partir de la exploración. No implementes.',
			description: 'Genera propuesta, specs, diseño y tareas.',
			profileBadge: 'Perfil ampliado: /opsx:new, /opsx:continue, /opsx:ff',
		},
		{
			id: 'checkpoint',
			label: 'Revisión',
			command:
				'npx openspec show add-public-api-rate-limiting\nnpx openspec validate add-public-api-rate-limiting --strict',
			description:
				'Revisión manual antes de aplicar: alcance, escenarios negativos, compatibilidad, observabilidad, rollback y pruebas.',
		},
		{
			id: 'apply',
			label: 'Apply',
			command:
				'Usa la skill /openspec-apply-change para implementar add-public-api-rate-limiting. Ejecuta solo los comandos aprobados, actualiza tasks.md y detente ante cualquier contradicción.',
			description: 'Implementa y marca tareas.',
			profileBadge: 'Perfil ampliado: /opsx:verify (no bloquea archive)',
		},
		{
			id: 'sync',
			label: 'Sync',
			command: 'Usa /openspec-sync-specs para mostrar primero el delta que se fusionará.',
			description: 'Fusiona deltas en specs vigentes sin archivar.',
		},
		{
			id: 'archive',
			label: 'Archive',
			command:
				'Usa /openspec-archive-change para archivar el cambio. Confirma que todas las tareas, pruebas y aprobaciones humanas estén completas.',
			description: 'Comprueba estado, ofrece sincronizar y mueve el change.',
		},
	],
	edges: [
		{ from: 'explore', to: 'propose', kind: 'forward' },
		{ from: 'propose', to: 'checkpoint', kind: 'forward' },
		{ from: 'checkpoint', to: 'apply', kind: 'forward' },
		{ from: 'checkpoint', to: 'propose', kind: 'return' },
		{ from: 'apply', to: 'sync', kind: 'forward' },
		{ from: 'sync', to: 'archive', kind: 'forward' },
	],
	examples: [
		{
			id: 'normal',
			label: 'Ceremonia normal',
			detail:
				'Recorrido feliz: cada paso avanza al siguiente sin retroceder, desde explore hasta archive.',
			stepIds: ['explore', 'propose', 'checkpoint', 'apply', 'sync', 'archive'],
			pathEdgeKeys: [
				edgeKey({ from: 'explore', to: 'propose' }),
				edgeKey({ from: 'propose', to: 'checkpoint' }),
				edgeKey({ from: 'checkpoint', to: 'apply' }),
				edgeKey({ from: 'apply', to: 'sync' }),
				edgeKey({ from: 'sync', to: 'archive' }),
			],
		},
		{
			id: 'solicitud-de-cambios',
			label: 'Ceremonia con solicitud de cambios',
			detail:
				'La revisión encuentra alcance insuficiente, escenarios negativos faltantes o incompatibilidades: el flujo vuelve a propose en vez de avanzar a apply.',
			stepIds: ['explore', 'propose', 'checkpoint'],
			pathEdgeKeys: [
				edgeKey({ from: 'explore', to: 'propose' }),
				edgeKey({ from: 'propose', to: 'checkpoint' }),
				edgeKey({ from: 'checkpoint', to: 'propose' }),
			],
		},
	],
};

export function hasCeremonyView(slug: string): boolean {
	return slug === 'openspec';
}
