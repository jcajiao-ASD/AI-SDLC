// @ts-check
import preact from '@astrojs/preact';
import { defineConfig } from 'astro/config';

const base = process.env.BASE_PATH || '/';

export default defineConfig({
	base,
	integrations: [preact()],
	output: 'static',
	site: process.env.SITE_URL || 'https://example.github.io',
	trailingSlash: 'always',
});
