import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const configuredBase = process.env.BASE_PATH || '/';
const basePrefix =
	configuredBase === '/' ? '' : `/${configuredBase.replace(/^\/+|\/+$/g, '')}`;
const port = Number(process.env.PLAYWRIGHT_PORT || (basePrefix ? 4322 : 4321));
const origin = `http://127.0.0.1:${port}`;

function sitePath(path: string): string {
	const normalizedPath = path.startsWith('/') ? path : `/${path}`;
	return `${basePrefix}${normalizedPath}` || '/';
}

function siteUrl(path: string): string {
	return `${origin}${sitePath(path)}`;
}

test('la gráfica identifica el líder documentado sin depender solo del color', async ({ page }) => {
	await page.goto(siteUrl('/historias/llm-por-fase/'));
	const chartHost = page.locator('.chart-host').first();
	const leaderRow = chartHost.locator('.chart-row--leader');
	await expect(leaderRow).toHaveCount(1);
	await expect(leaderRow.locator('.chart-row__badge')).toHaveText('Líder');
	await expect(leaderRow.locator('.chart-row__label')).toContainText('GPT-5.6 Sol');
});

test('la selección coordina gráfica y tabla en ambos sentidos por clave estable', async ({ page }) => {
	await page.goto(siteUrl('/historias/llm-por-fase/'));
	const chartHost = page.locator('.chart-host').first();
	const gptRow = chartHost.locator('[data-row-key="gpt-5-6-sol"]');
	const table = page.getByRole('table', { name: 'Ranking ponderado de LLMs' });
	const tableRow = table.locator('tr[data-row-key="gpt-5-6-sol"]');

	await expect(tableRow).toHaveAttribute('aria-selected', 'false');
	await gptRow.click();
	await expect(gptRow).toHaveAttribute('aria-selected', 'true');
	await expect(tableRow).toHaveAttribute('aria-selected', 'true');
	await expect(page.getByRole('status').filter({ hasText: 'Seleccionado' })).toContainText(
		'GPT-5.6 Sol',
	);

	await gptRow.click();
	await expect(gptRow).toHaveAttribute('aria-selected', 'false');
	await expect(tableRow).toHaveAttribute('aria-selected', 'false');

	const claudeTableRow = table.locator('tr[data-row-key="claude-fable-5"]');
	await claudeTableRow.click();
	const claudeChartRow = chartHost.locator('[data-row-key="claude-fable-5"]');
	await expect(claudeChartRow).toHaveAttribute('aria-selected', 'true');
	await expect(claudeTableRow).toHaveClass(/table-row--selected/);
});

test('la selección se navega por teclado sin usar el puntero', async ({ page }) => {
	await page.goto(siteUrl('/historias/llm-por-fase/'));
	const chartHost = page.locator('.chart-host').first();
	await chartHost.scrollIntoViewIfNeeded();
	const firstRow = chartHost.locator('.chart-row').first();
	await firstRow.focus();
	await expect(firstRow).toBeFocused();

	await page.keyboard.press('ArrowDown');
	const secondRow = chartHost.locator('.chart-row').nth(1);
	await expect(secondRow).toBeFocused();

	await page.keyboard.press('Enter');
	await expect(secondRow).toHaveAttribute('aria-selected', 'true');
	await expect(page.getByRole('status').filter({ hasText: 'Seleccionado' })).not.toBeEmpty();
});

test('la figura muestra unidad, corte, confianza, fuente y caveat declarados', async ({ page }) => {
	await page.goto(siteUrl('/historias/llm-por-fase/'));
	const figure = page.locator('.visualization-figure').first();
	const meta = figure.locator('.visualization-figure__meta');
	await expect(meta.getByText('Puntuación / 100', { exact: true })).toBeVisible();
	await expect(meta.getByText('2026-07-20', { exact: true })).toBeVisible();
	await expect(meta.getByText('Confianza mixta', { exact: true })).toBeVisible();
	await expect(
		figure.getByRole('link', { name: /Comparativa de LLMs/ }),
	).toHaveAttribute('href', sitePath('/investigaciones/comparativa-llms-sdlc/'));
	await expect(
		figure.getByText(/no representa porcentaje de mejora medida|no equivale a mejora porcentual medida/),
	).toBeVisible();
});

test('los cambios de selección no animan bajo movimiento reducido', async ({ page }) => {
	await page.emulateMedia({ reducedMotion: 'reduce' });
	await page.goto(siteUrl('/historias/llm-por-fase/'));
	const fill = page.locator('.chart-host .chart-row__fill').first();
	const durationSeconds = await fill.evaluate((element) => {
		const value = getComputedStyle(element).transitionDuration;
		return value.endsWith('ms') ? Number.parseFloat(value) / 1000 : Number.parseFloat(value);
	});
	expect(durationSeconds).toBeLessThanOrEqual(0.0001);
});

test('la gráfica permanece operable y equivalente a la tabla sin JavaScript', async ({ browser }) => {
	const context = await browser.newContext({ javaScriptEnabled: false });
	const page = await context.newPage();
	await page.goto(siteUrl('/historias/llm-por-fase/'));

	const chartHost = page.locator('.chart-host').first();
	const chartLabels = await chartHost.locator('.chart-row__label').allInnerTexts();
	const table = page.getByRole('table', { name: 'Ranking ponderado de LLMs' });
	const tableLabels = await table.locator('tbody th[scope="row"]').allInnerTexts();

	for (const label of tableLabels) {
		expect(chartLabels.some((chartLabel) => chartLabel.includes(label))).toBe(true);
	}
	await expect(chartHost.locator('.chart-row__value').first()).toBeVisible();
	await context.close();
});

test('las historias con visualizaciones no presentan violaciones automáticas de accesibilidad', async ({
	page,
}) => {
	for (const route of ['/historias/llm-por-fase/', '/historias/seleccion-framework/']) {
		await page.goto(siteUrl(route));
		const results = await new AxeBuilder({ page }).analyze();
		expect(results.violations, route).toEqual([]);
	}
});
