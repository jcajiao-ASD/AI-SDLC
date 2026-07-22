import { defineConfig, devices } from '@playwright/test';

const configuredBase = process.env.BASE_PATH || '/';
const normalizedBase =
	configuredBase === '/' ? '/' : `/${configuredBase.replace(/^\/+|\/+$/g, '')}/`;
const port = Number(process.env.PLAYWRIGHT_PORT || (normalizedBase === '/' ? 4321 : 4322));
const origin = `http://127.0.0.1:${port}`;

export default defineConfig({
	testDir: './tests',
	fullyParallel: true,
	retries: process.env.CI ? 2 : 0,
	reporter: process.env.CI ? 'github' : 'list',
	use: {
		baseURL: origin,
		trace: 'retain-on-failure',
	},
	webServer: {
		command: `npm run build && npm run preview -- --host 127.0.0.1 --port ${port}`,
		env: {
			...process.env,
			BASE_PATH: normalizedBase,
		},
		url: `${origin}${normalizedBase}`,
		reuseExistingServer: normalizedBase === '/' && !process.env.CI,
		timeout: 120_000,
	},
	projects: [
		{ name: 'chromium', use: { ...devices['Desktop Chrome'] } },
		{ name: 'mobile', use: { ...devices['Pixel 7'] } },
	],
});
