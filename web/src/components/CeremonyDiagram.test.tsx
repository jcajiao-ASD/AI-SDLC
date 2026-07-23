// @vitest-environment jsdom

import { render } from 'preact';
import { act } from 'preact/test-utils';
import { afterEach, describe, expect, it } from 'vitest';
import CeremonyDiagram from './CeremonyDiagram';

let container: HTMLDivElement | undefined;

function mount() {
	const mountPoint = document.createElement('div');
	container = mountPoint;
	document.body.append(mountPoint);
	act(() => render(<CeremonyDiagram />, mountPoint));
	return mountPoint;
}

afterEach(() => {
	if (container) {
		const mountPoint = container;
		act(() => render(null, mountPoint));
		mountPoint.remove();
		container = undefined;
	}
});

describe('CeremonyDiagram', () => {
	it('muestra siempre ambos ejemplos completos, sin depender del estado activo', () => {
		const view = mount();
		const sections = view.querySelectorAll('.ceremony-diagram__example');

		expect(sections).toHaveLength(2);
		expect(view.textContent).toContain('Ceremonia normal');
		expect(view.textContent).toContain('Ceremonia con solicitud de cambios');
		expect(view.textContent).toContain('npx openspec validate add-public-api-rate-limiting --strict');
	});

	it('activa la ceremonia normal por defecto', () => {
		const view = mount();
		const buttons = [...view.querySelectorAll('.ceremony-diagram__toggle-button')];

		expect(buttons[0].getAttribute('aria-pressed')).toBe('true');
		expect(buttons[1].getAttribute('aria-pressed')).toBe('false');
		expect(view.querySelector('.ceremony-diagram__example-detail')?.textContent).toContain(
			'Recorrido feliz',
		);
	});

	it('al alternar a la solicitud de cambios resalta la arista de retorno a propose', () => {
		const view = mount();
		const buttons = [...view.querySelectorAll('.ceremony-diagram__toggle-button')];

		act(() => {
			(buttons[1] as HTMLButtonElement).dispatchEvent(
				new MouseEvent('click', { bubbles: true }),
			);
		});

		expect(buttons[1].getAttribute('aria-pressed')).toBe('true');
		expect(view.querySelector('.ceremony-diagram__example-detail')?.textContent).toContain(
			'vuelve a propose',
		);

		const returnEdge = view.querySelector('.ceremony-diagram__edge--return');
		expect(returnEdge?.classList.contains('ceremony-diagram__edge--active')).toBe(true);
	});

	it('marca el SVG como decorativo', () => {
		const view = mount();
		const svg = view.querySelector('svg');

		expect(svg?.getAttribute('aria-hidden')).toBe('true');
	});
});
