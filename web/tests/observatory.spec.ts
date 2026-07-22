import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

test('la portada conduce a las tres decisiones', async ({ page }) => {
	await page.goto('/');
	await expect(page.getByRole('heading', { level: 1 })).toContainText('decisión auditable');
	await expect(page.getByRole('link', { name: /Abrir historia/ })).toHaveCount(3);
	const results = await new AxeBuilder({ page }).analyze();
	expect(results.violations).toEqual([]);
	await page.keyboard.press('Tab');
	await expect(page.getByRole('link', { name: 'Saltar al contenido' })).toBeFocused();
});

test('el catálogo filtra y conserva rutas navegables', async ({ page }) => {
	await page.goto('/investigaciones/');
	await expect(page.getByText('13 investigaciones visibles')).toBeVisible();
	await page.getByLabel('Categoría').selectOption('modelos');
	await expect(page.getByText('1 investigaciones visibles')).toBeVisible();
	await page.getByRole('link', { name: /Comparativa de LLMs/ }).click();
	await expect(page.getByRole('heading', { level: 1 })).toContainText('Comparativa de LLMs');
});

test('las historias muestran conclusión y caveat antes de interactuar', async ({ page }) => {
	await page.goto('/historias/seleccion-framework/');
	await expect(page.getByText('Respuesta ejecutiva')).toBeVisible();
	await expect(page.getByText(/scorecards son ordinales/i)).toBeVisible();
	await expect(page.getByLabel(/Peso de adopción/)).toHaveValue('65');
});

for (const route of [
	'/investigaciones/',
	'/historias/llm-por-fase/',
	'/historias/seleccion-agente/',
	'/historias/seleccion-framework/',
]) {
	test(`la ruta ${route} no presenta violaciones automáticas de accesibilidad`, async ({ page }) => {
		await page.goto(route);
		const results = await new AxeBuilder({ page }).analyze();
		expect(results.violations).toEqual([]);
	});
}

test('el contenido principal permanece disponible sin JavaScript', async ({ browser }) => {
	const context = await browser.newContext({ javaScriptEnabled: false });
	const page = await context.newPage();
	await page.goto('/investigaciones/');
	await expect(page.getByRole('link', { name: /Comparativa de LLMs/ })).toBeVisible();
	await page.goto('/historias/llm-por-fase/');
	await expect(page.getByText(/GPT-5.6 Sol es el generalista/)).toBeVisible();
	await expect(page.getByRole('table', { name: 'Ranking ponderado de LLMs' })).toBeVisible();
	await page.goto('/historias/seleccion-agente/');
	await expect(page.getByRole('table', { name: 'Herramienta recomendada por perfil de equipo' })).toBeVisible();
	await page.goto('/historias/seleccion-framework/');
	await expect(page.getByRole('table', { name: 'Ranking de frameworks con lente adopción-first' })).toBeVisible();
	await context.close();
});
