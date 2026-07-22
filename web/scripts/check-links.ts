import { readdir, readFile, stat } from 'node:fs/promises';
import { resolve } from 'node:path';

const dist = resolve(process.cwd(), 'dist');
const configuredBase = (process.env.BASE_PATH || '/').replace(/\/$/, '');

async function filesBelow(directory: string): Promise<string[]> {
	const entries = await readdir(directory, { withFileTypes: true });
	const nested = await Promise.all(
		entries.map((entry) => {
			const path = resolve(directory, entry.name);
			return entry.isDirectory() ? filesBelow(path) : [path];
		}),
	);
	return nested.flat();
}

function localTarget(raw: string): string | undefined {
	if (
		raw.startsWith('#') ||
		raw.startsWith('http:') ||
		raw.startsWith('https:') ||
		raw.startsWith('mailto:') ||
		raw.startsWith('tel:') ||
		raw.startsWith('data:')
	) {
		return undefined;
	}
	const pathname = decodeURIComponent(raw.split('#')[0].split('?')[0]);
	if (!pathname.startsWith('/')) return undefined;
	if (configuredBase && configuredBase !== '/' && !pathname.startsWith(`${configuredBase}/`)) {
		throw new Error(`Ruta fuera del BASE_PATH ${configuredBase}: ${raw}`);
	}
	const withoutBase =
		configuredBase && configuredBase !== '/' ? pathname.slice(configuredBase.length) : pathname;
	return withoutBase || '/';
}

const files = await filesBelow(dist);
const htmlFiles = files.filter((file) => file.endsWith('.html'));
const missing = new Set<string>();

for (const htmlFile of htmlFiles) {
	const html = await readFile(htmlFile, 'utf8');
	for (const match of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
		const target = localTarget(match[1]);
		if (!target) continue;
		const relative = target.replace(/^\//, '');
		const candidate = resolve(
			dist,
			relative.endsWith('/') || relative === '' ? relative : relative,
			relative.endsWith('/') || relative === '' ? 'index.html' : '',
		);
		try {
			const details = await stat(candidate);
			if (details.isDirectory()) {
				await stat(resolve(candidate, 'index.html'));
			}
		} catch {
			missing.add(`${htmlFile.replace(`${dist}/`, '')} -> ${match[1]}`);
		}
	}
}

if (missing.size) {
	throw new Error(`Enlaces o assets inexistentes:\n${[...missing].join('\n')}`);
}

console.log(`Enlaces válidos: ${htmlFiles.length} páginas estáticas.`);
