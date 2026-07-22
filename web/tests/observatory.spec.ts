import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

test('la portada conduce al configurador y a las tres decisiones', async ({ page }) => {
	await page.goto('/');
	await expect(page.getByRole('heading', { level: 1 })).toContainText('decisión auditable');
	await expect(page.getByRole('link', { name: /Configurar stack/ })).toBeVisible();
	await expect(page.getByRole('link', { name: /Abrir historia/ })).toHaveCount(3);
	const results = await new AxeBuilder({ page }).analyze();
	expect(results.violations).toEqual([]);
	await page.keyboard.press('Tab');
	await expect(page.getByRole('link', { name: 'Saltar al contenido' })).toBeFocused();
});

test('JetBrains Mono carga localmente sus variantes reales', async ({ page }) => {
	const fontRequests: string[] = [];
	page.on('request', (request) => {
		if (request.resourceType() === 'font') {
			fontRequests.push(request.url());
		}
	});

	await page.goto('/sistema-diseno/');
	await expect(page.locator('[data-font-sample="normal"]')).toBeVisible();
	await expect(page.locator('[data-font-sample="italic"]')).toHaveCSS('font-style', 'italic');
	await expect(page.locator('[data-font-sample="bold"]')).toHaveCSS('font-weight', '800');

	const loaded = await page.evaluate(async () => {
		await document.fonts.ready;
		const [normal, italic, bold] = await Promise.all([
			document.fonts.load('400 16px "JetBrains Mono Variable"', 'Claridad'),
			document.fonts.load('italic 400 16px "JetBrains Mono Variable"', 'Evidencia'),
			document.fonts.load('800 16px "JetBrains Mono Variable"', 'Decidir'),
		]);

		return {
			normal: normal.length > 0 && document.fonts.check('400 16px "JetBrains Mono Variable"'),
			italic: italic.length > 0 && document.fonts.check('italic 400 16px "JetBrains Mono Variable"'),
			bold: bold.length > 0 && document.fonts.check('800 16px "JetBrains Mono Variable"'),
			family: getComputedStyle(document.documentElement).fontFamily,
		};
	});

	expect(loaded).toEqual({
		normal: true,
		italic: true,
		bold: true,
		family: expect.stringContaining('JetBrains Mono Variable'),
	});
	expect(fontRequests.length).toBeGreaterThan(0);
	const pageOrigin = new URL(page.url()).origin;
	expect(fontRequests.every((url) => new URL(url).origin === pageOrigin)).toBe(true);
});

test('el catálogo filtra y conserva rutas navegables', async ({ page }) => {
	await page.goto('/investigaciones/');
	await expect(page.getByText('13 investigaciones visibles')).toBeVisible();
	await page.getByLabel('Categoría').selectOption('modelos');
	await expect(page.getByText('1 investigaciones visibles')).toBeVisible();
	await page.getByRole('link', { name: /Comparativa de LLMs/ }).click();
	await expect(page.getByRole('heading', { level: 1 })).toContainText('Comparativa de LLMs');
});

test('la tipografía no provoca desplazamiento horizontal de página', async ({ page }) => {
	for (const route of [
		'/',
		'/investigaciones/',
		'/investigaciones/comparativa-llms-sdlc/',
		'/historias/llm-por-fase/',
		'/historias/seleccion-agente/',
		'/historias/seleccion-framework/',
		'/historias/configurador-stack/',
		'/sistema-diseno/',
	]) {
		await page.goto(route);
		await page.evaluate(() => document.fonts.ready);
		const dimensions = await page.evaluate(() => ({
			clientWidth: document.documentElement.clientWidth,
			scrollWidth: document.documentElement.scrollWidth,
		}));
		expect(dimensions.scrollWidth, route).toBeLessThanOrEqual(dimensions.clientWidth + 1);
	}
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
	'/historias/configurador-stack/',
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
	await page.goto('/historias/configurador-stack/');
	await expect(page.getByText('Stack compatible documentado', { exact: true })).toBeVisible();
	await expect(page.getByText('Límite de interpretación', { exact: true })).toBeVisible();
	await expect(page.getByRole('table', { name: 'Compatibilidad entre agentes y modelos' })).toBeVisible();
	const frameworkTable = page.getByRole('table', {
		name: 'Compatibilidad entre agentes y frameworks',
	});
	await expect(frameworkTable).toBeVisible();
	await expect(
		frameworkTable.getByRole('row', {
			name: /Junie.*Superpowers.*no-confirmada/i,
		}),
	).toBeVisible();
	await expect(page.getByRole('link', { name: 'Fuente oficial' }).first()).toBeVisible();
	await context.close();
});

test('el configurador conserva semántica, compatibilidad y alternativas', async ({ page }) => {
	await page.goto('/historias/configurador-stack/');

	await expect(page.getByLabel('Contexto del agente')).toHaveValue('github');
	await expect(page.getByLabel('Fase del SDLC')).toHaveValue('diseno');
	await expect(page.getByLabel('Escenario de proceso')).toHaveValue('adopcion-progresiva');
	await expect(page.getByText('Stack compatible documentado', { exact: true })).toBeVisible();
	const agentSelector = page.getByLabel('Contexto del agente');
	await agentSelector.focus();
	await page.keyboard.press('ArrowDown');
	await expect(agentSelector).toHaveValue('ide-jira');
	await expect(page.getByRole('link', { name: 'Auditar estudio fuente' }).first()).toHaveAttribute(
		'href',
		/investigaciones\/seleccion-agente-codificacion-sdlc/,
	);
	await agentSelector.selectOption('github');

	await page.getByLabel('Fase del SDLC').selectOption('implementacion');
	await expect(page.getByText('Stacks compatibles documentados', { exact: true })).toBeVisible();
	await expect(page.locator('.stack-combination')).toHaveCount(2);

	await page.getByLabel('Contexto del agente').selectOption('sin-centro');
	await expect(page.getByText('La selección requiere un piloto comparativo', { exact: true })).toBeVisible();
	await expect(page.getByText(/Cursor, Junie, OpenCode/)).toBeVisible();

	await page.getByLabel('Contexto del agente').selectOption('jetbrains');
	await page.getByLabel('Fase del SDLC').selectOption('pruebas');
	await page.getByLabel('Escenario de proceso').selectOption('tdd');
	await expect(page.getByText('No hay un stack verificable con estas selecciones', { exact: true })).toBeVisible();
	await expect(
		page.locator('.stack-result li').filter({
			hasText: /Cursor.*Superpowers.*condicionada/i,
		}),
	).toBeVisible();

	await page.getByLabel('Contexto del agente').selectOption('github');
	await page.getByLabel('Fase del SDLC').selectOption('devops');
	await page.getByLabel('Escenario de proceso').selectOption('hotfix');
	await expect(page.getByRole('heading', { name: /sin framework/ })).toBeVisible();
});

test('el resultado inicial SSR coincide con la primera hidratación', async ({ browser, page }) => {
	const withoutJavaScript = await browser.newContext({ javaScriptEnabled: false });
	const staticPage = await withoutJavaScript.newPage();
	await staticPage.goto('/historias/configurador-stack/');
	const staticResult = await staticPage.locator('.stack-result').innerText();

	await page.goto('/historias/configurador-stack/');
	await expect(page.getByLabel('Contexto del agente')).toHaveValue('github');
	const hydratedResult = await page.locator('.stack-result').innerText();

	expect(hydratedResult).toBe(staticResult);
	await withoutJavaScript.close();
});

test('los iconos se renderizan como SVG inline local', async ({ page }) => {
	const requests: string[] = [];
	page.on('request', (request) => requests.push(request.url()));

	await page.goto('/sistema-diseno/');
	const iconSection = page.getByRole('region', { name: 'Iconografía SVG' });
	const icons = iconSection.locator('svg.icon');
	await expect(icons).toHaveCount(4);
	await expect(icons.first()).toHaveAttribute('aria-hidden', 'true');
	await expect(iconSection.getByText('Estado positivo', { exact: true })).toBeVisible();
	await expect(iconSection.getByText('Advertencia', { exact: true })).toBeVisible();
	await expect(iconSection.getByText('Información', { exact: true })).toBeVisible();
	await expect(iconSection.getByText('Acción o avance', { exact: true })).toBeVisible();

	await page.goto('/');
	const storyLinks = page.getByRole('link', { name: 'Abrir historia' });
	await expect(storyLinks).toHaveCount(3);
	await expect(storyLinks.first().locator('svg.icon')).toHaveCount(1);

	await page.goto('/investigaciones/comparativa-llms-sdlc/');
	await expect(page.getByText('No (jul-2026)', { exact: true })).toBeVisible();
	await expect(page.getByText('1.º', { exact: true }).first()).toBeVisible();

	const origin = new URL(page.url()).origin;
	const externalRequests = requests.filter((url) => new URL(url).origin !== origin);
	expect(externalRequests).toEqual([]);
});
