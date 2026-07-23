// @vitest-environment jsdom

import { render } from 'preact';
import { act } from 'preact/test-utils';
import { afterEach, describe, expect, it } from 'vitest';
import type {
	CompatibilityRecord,
	RecommendationOption,
} from '../lib/stack';
import StackConfigurator from './StackConfigurator';

function option(
	key: string,
	recommendation: string,
	candidates: RecommendationOption['candidates'],
): RecommendationOption {
	return {
		key,
		label: `Opción ${key}`,
		candidates,
		recommendation,
		reason: `Motivo suficientemente explícito para ${recommendation}`,
		caveat: `Caveat suficientemente explícito para ${recommendation}`,
	};
}

function relation(
	agentKey: string,
	agentLabel: string,
	componentKey: string,
	componentLabel: string,
	status: CompatibilityRecord['status'],
): CompatibilityRecord {
	return {
		agentKey,
		agentLabel,
		componentKey,
		componentLabel,
		status,
		mechanism: `${status} mediante mecanismo documentado`,
		note: 'Nota verificable',
		source: 'https://example.com/source',
		verifiedAt: '2026-07-22',
	};
}

const props = {
	agentOptions: [
		option('github', 'GitHub Copilot CLI', [
			{ role: 'primary' as const, key: 'copilot' },
		]),
		option('sin-centro', 'Piloto comparativo', [
			{ role: 'pilot' as const, key: 'cursor' },
			{ role: 'pilot' as const, key: 'junie' },
			{ role: 'pilot' as const, key: 'opencode' },
		]),
		option('jetbrains', 'Junie', [
			{ role: 'primary' as const, key: 'junie' },
		]),
	],
	modelOptions: [
		option('diseno', 'Claude Fable 5 y GPT-5.6 Sol', [
			{ role: 'co-primary' as const, key: 'fable' },
			{ role: 'co-primary' as const, key: 'sol' },
		]),
		option('pruebas', 'Claude Sonnet 5', [
			{ role: 'primary' as const, key: 'sonnet' },
		]),
		option('devops', 'GPT-5.6 Sol', [
			{ role: 'primary' as const, key: 'sol' },
		]),
	],
	frameworkOptions: [
		option('adopcion', 'OpenSpec', [
			{ role: 'primary' as const, key: 'openspec' },
		]),
		option('tdd', 'Superpowers', [
			{ role: 'primary' as const, key: 'superpowers' },
		]),
		option('hotfix', 'Sin framework', [
			{ role: 'none' as const, key: 'none' },
		]),
	],
	modelCompatibility: [
		relation('copilot', 'GitHub Copilot CLI', 'fable', 'Claude Fable 5', 'nativa'),
		relation('copilot', 'GitHub Copilot CLI', 'sol', 'GPT-5.6 Sol', 'condicionada'),
		relation('junie', 'Junie', 'sonnet', 'Claude Sonnet 5', 'nativa'),
		relation('cursor', 'Cursor', 'sonnet', 'Claude Sonnet 5', 'nativa'),
		relation('opencode', 'OpenCode', 'sol', 'GPT-5.6 Sol', 'condicionada'),
	],
	frameworkCompatibility: [
		relation('copilot', 'GitHub Copilot CLI', 'openspec', 'OpenSpec', 'nativa'),
		relation('junie', 'Junie', 'superpowers', 'Superpowers', 'no-confirmada'),
		relation('cursor', 'Cursor', 'superpowers', 'Superpowers', 'condicionada'),
	],
	defaults: {
		agent: 'github',
		model: 'diseno',
		framework: 'adopcion',
	},
	sourceLinks: {
		agent: '/agente',
		model: '/modelo',
		framework: '/framework',
	},
};

let container: HTMLDivElement | undefined;

function mount() {
	const mountPoint = document.createElement('div');
	container = mountPoint;
	document.body.append(mountPoint);
	act(() => render(<StackConfigurator {...props} />, mountPoint));
	return mountPoint;
}

function selectAt(index: number, value: string) {
	const select = container?.querySelectorAll('select')[index] as HTMLSelectElement;
	act(() => {
		select.value = value;
		select.dispatchEvent(new Event('change', { bubbles: true }));
	});
}

afterEach(() => {
	if (container) {
		const mountPoint = container;
		act(() => render(null, mountPoint));
		mountPoint.remove();
		container = undefined;
	}
});

describe('configurador de stack', () => {
	it('renderiza los tres selectores y conserva co-principales y condiciones', () => {
		const view = mount();
		const selects = view.querySelectorAll('select');

		expect(selects).toHaveLength(3);
		expect([...selects].map(({ value }) => value)).toEqual([
			'github',
			'diseno',
			'adopcion',
		]);
		expect(view.querySelectorAll('.stack-combination')).toHaveLength(2);
		expect(view.textContent).toContain('Stacks compatibles documentados');
		expect(view.textContent).toContain('condicionada');
	});

	it('presenta pilotos sin promoverlos a stack final', () => {
		const view = mount();
		selectAt(0, 'sin-centro');

		expect(view.textContent).toContain('La selección requiere un piloto comparativo');
		expect(view.textContent).toContain('Cursor, Junie, OpenCode');
		expect(view.querySelectorAll('.stack-combination')).toHaveLength(0);
	});

	it('bloquea una combinación no confirmada y muestra alternativas compatibles', () => {
		const view = mount();
		selectAt(0, 'jetbrains');
		selectAt(1, 'pruebas');
		selectAt(2, 'tdd');

		expect(view.textContent).toContain('No hay un stack verificable');
		expect(view.textContent).toContain('Junie ↔ Superpowers');
		expect(view.textContent).toContain('Cursor con Superpowers: condicionada');
	});

	it('representa explícitamente el escenario sin framework', () => {
		const view = mount();
		selectAt(1, 'devops');
		selectAt(2, 'hotfix');

		expect(view.textContent).toContain(
			'GitHub Copilot CLI + GPT-5.6 Sol + sin framework',
		);
		expect(view.textContent).toContain('Stack verificado con condiciones');
	});

	it('presenta tres pasos independientes con un resumen derivado del mismo resultado', () => {
		const view = mount();
		const steps = view.querySelectorAll('.stack-step');

		expect(steps).toHaveLength(3);
		expect([...steps].map((step) => step.getAttribute('data-stack-layer'))).toEqual([
			'agent',
			'model',
			'framework',
		]);

		const summary = view.querySelector('.stack-summary');
		expect(summary).not.toBeNull();
		expect(summary?.textContent).toContain('Stacks compatibles documentados');
		expect(summary?.querySelectorAll('.stack-summary__combinations li')).toHaveLength(2);
		expect(summary?.textContent).toContain('Stack verificado con condiciones');
		expect(summary?.querySelector('a[href="#stack-detail"]')).not.toBeNull();
		expect(view.querySelector('#stack-detail')).not.toBeNull();
	});

	it('editar un paso no reinicia las selecciones de los otros dos', () => {
		const view = mount();
		selectAt(1, 'pruebas');

		const selects = [...view.querySelectorAll('select')];
		expect(selects.map(({ value }) => value)).toEqual(['github', 'pruebas', 'adopcion']);

		selectAt(2, 'tdd');
		expect(selects.map(({ value }) => value)).toEqual(['github', 'pruebas', 'tdd']);
	});

	it('muestra el conflicto no confirmado junto al paso de framework que lo origina', () => {
		const view = mount();
		selectAt(0, 'jetbrains');
		selectAt(1, 'pruebas');
		selectAt(2, 'tdd');

		const frameworkStep = view.querySelector('[data-stack-layer="framework"]');
		expect(frameworkStep?.textContent).toContain('no-confirmada');
		expect(frameworkStep?.textContent).toContain('Cursor con Superpowers: condicionada');

		const agentStep = view.querySelector('[data-stack-layer="agent"]');
		expect(agentStep?.textContent).not.toContain('Superpowers');
	});

	it('anuncia el estado global y el conflicto principal en una región concentrada', () => {
		const view = mount();
		const status = view.querySelector('[role="status"]');
		expect(status).not.toBeNull();
		expect(status?.textContent).toContain('Stack verificado');
		expect(status?.textContent).not.toContain('con condiciones');

		selectAt(0, 'jetbrains');
		selectAt(1, 'pruebas');
		selectAt(2, 'tdd');
		expect(status?.textContent).toContain('Superpowers');
		expect(status?.textContent).toContain('no-confirmada');
	});
});
