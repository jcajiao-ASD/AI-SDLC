function stripMarkdown(value: string): string {
	return value
		.replace(/!\[([^\]]*)\]\([^)]+\)/g, '$1')
		.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
		.replace(/[*_`]/g, '')
		.replace(/<[^>]+>/g, '')
		.trim();
}

export function slugifyKey(value: string): string {
	const slug = stripMarkdown(value)
		.normalize('NFD')
		.replace(/\p{Diacritic}/gu, '')
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-+|-+$/g, '');
	if (!slug) {
		throw new Error(`No se pudo derivar una clave estable de "${value}"`);
	}
	return slug;
}

export function assertUniqueKeys(keys: string[], source: string): void {
	const seen = new Set<string>();
	for (const key of keys) {
		if (seen.has(key)) {
			throw new Error(`${source}: clave de coordinación duplicada (${key})`);
		}
		seen.add(key);
	}
}
