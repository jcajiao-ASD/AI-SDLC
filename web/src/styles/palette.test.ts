import { readdir, readFile } from 'node:fs/promises';
import { extname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

const sourceRoot = fileURLToPath(new URL('..', import.meta.url));
const currentFile = fileURLToPath(import.meta.url);
const sourceExtensions = new Set(['.astro', '.css', '.js', '.jsx', '.ts', '.tsx']);
const legacyColors = [
	'#155e4b',
	'#0b4435',
	'#17211c',
	'#46534b',
	'#1d6a48',
	'#ecefe9',
	'#ccd3cc',
	'#8bbda6',
	'#e5f4ec',
	'#83aa9b',
	'#e9f2ee',
	'#c9ded5',
	'rgb(21 94 75',
];

async function sourceFiles(directory: string): Promise<string[]> {
	const entries = await readdir(directory, { withFileTypes: true });
	const files = await Promise.all(
		entries.map(async (entry) => {
			const entryPath = join(directory, entry.name);
			if (entry.isDirectory()) return sourceFiles(entryPath);
			return sourceExtensions.has(extname(entry.name)) ? [entryPath] : [];
		}),
	);
	return files.flat();
}

describe('paleta Tinta Costera', () => {
	it('declara los cinco tonos canónicos', async () => {
		const tokens = await readFile(new URL('./tokens.css', import.meta.url), 'utf8');
		expect(tokens).toContain('--color-coast-deep: #12233f;');
		expect(tokens).toContain('--color-coast-indigo: #243b77;');
		expect(tokens).toContain('--color-coast-teal: #2f7ea8;');
		expect(tokens).toContain('--color-coast-aqua: #cbeaf2;');
		expect(tokens).toContain('--color-coast-paper: #f7fbff;');
	});

	it('no conserva los verdes heredados en el código fuente', async () => {
		const matches: string[] = [];
		for (const file of await sourceFiles(sourceRoot)) {
			if (file === currentFile) continue;
			const content = (await readFile(file, 'utf8')).toLowerCase();
			for (const color of legacyColors) {
				if (content.includes(color)) matches.push(`${file}: ${color}`);
			}
		}
		expect(matches).toEqual([]);
	});
});
