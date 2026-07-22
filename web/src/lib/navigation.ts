export type NavigationMatch = 'exact' | 'prefix';

export interface NavigationDestination {
	id: string;
	label: string;
	path: string;
	match: NavigationMatch;
}

export interface NavigationGroup {
	id: string;
	label: string;
	items: readonly NavigationDestination[];
}

export interface BreadcrumbItem {
	label: string;
	path?: string;
}

export const navigationDestinations = {
	model: {
		id: 'model',
		label: 'Modelo',
		path: '/historias/llm-por-fase/',
		match: 'exact',
	},
	agent: {
		id: 'agent',
		label: 'Agente',
		path: '/historias/seleccion-agente/',
		match: 'exact',
	},
	framework: {
		id: 'framework',
		label: 'Framework',
		path: '/historias/seleccion-framework/',
		match: 'exact',
	},
	stack: {
		id: 'stack',
		label: 'Stack',
		path: '/historias/configurador-stack/',
		match: 'exact',
	},
	research: {
		id: 'research',
		label: 'Investigaciones',
		path: '/investigaciones/',
		match: 'prefix',
	},
	methodology: {
		id: 'methodology',
		label: 'Metodología',
		path: '/metodologia/',
		match: 'exact',
	},
} as const satisfies Record<string, NavigationDestination>;

export const navigationGroups = [
	{
		id: 'decide',
		label: 'Decidir',
		items: [
			navigationDestinations.model,
			navigationDestinations.agent,
			navigationDestinations.framework,
			navigationDestinations.stack,
		],
	},
	{
		id: 'explore',
		label: 'Explorar',
		items: [
			navigationDestinations.research,
			navigationDestinations.methodology,
		],
	},
] as const satisfies readonly NavigationGroup[];

export const secondaryNavigationDestinations = {
	designSystem: {
		id: 'design-system',
		label: 'Sistema de diseño',
		path: '/sistema-diseno/',
		match: 'exact',
	},
} as const satisfies Record<string, NavigationDestination>;

export const secondaryNavigation = [
	secondaryNavigationDestinations.designSystem,
] as const satisfies readonly NavigationDestination[];

export const decisionShortcut = {
	label: 'Decidir',
	path: '/#decidir',
} as const;

function normalizeBasePath(basePath: string): string {
	if (!basePath || basePath === '/') return '/';
	const withLeadingSlash = basePath.startsWith('/') ? basePath : `/${basePath}`;
	return withLeadingSlash.endsWith('/') ? withLeadingSlash : `${withLeadingSlash}/`;
}

export function normalizeRoutePath(pathname: string, basePath = '/'): string {
	const pathnameOnly = pathname.split(/[?#]/, 1)[0] || '/';
	let normalized = pathnameOnly.startsWith('/') ? pathnameOnly : `/${pathnameOnly}`;
	const normalizedBase = normalizeBasePath(basePath);

	if (normalizedBase !== '/') {
		const baseWithoutTrailingSlash = normalizedBase.slice(0, -1);
		if (normalized === baseWithoutTrailingSlash) {
			normalized = '/';
		} else if (normalized.startsWith(normalizedBase)) {
			normalized = normalized.slice(baseWithoutTrailingSlash.length) || '/';
		}
	}

	if (normalized.length > 1 && !normalized.endsWith('/')) {
		normalized = `${normalized}/`;
	}

	return normalized;
}

export function isNavigationDestinationActive(
	destination: NavigationDestination,
	pathname: string,
	basePath = '/',
): boolean {
	const currentPath = normalizeRoutePath(pathname, basePath);
	const destinationPath = normalizeRoutePath(destination.path);

	return destination.match === 'prefix'
		? currentPath === destinationPath || currentPath.startsWith(destinationPath)
		: currentPath === destinationPath;
}
