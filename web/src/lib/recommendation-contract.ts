export const candidateRoles = [
	'primary',
	'co-primary',
	'alternative',
	'pilot',
	'none',
] as const;

export type CandidateRole = (typeof candidateRoles)[number];

export interface CandidateReference {
	role: CandidateRole;
	key: string;
}

const stableKeyPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const candidateRoleSet = new Set<string>(candidateRoles);

export function technicalValue(value: string): string {
	const trimmed = value.trim();
	const inlineCode = trimmed.match(/^`([^`]+)`$/);
	return inlineCode ? inlineCode[1] : trimmed;
}

export function isStableKey(value: string): boolean {
	return stableKeyPattern.test(technicalValue(value));
}

export function parseCandidateReferences(
	value: string,
	context = 'regla',
): CandidateReference[] {
	const references = technicalValue(value)
		.split(';')
		.map((entry) => entry.trim())
		.filter(Boolean)
		.map((entry) => {
			const separator = entry.indexOf(':');
			if (separator <= 0 || separator === entry.length - 1) {
				throw new Error(`${context}: candidato inválido (${entry})`);
			}
			const role = entry.slice(0, separator);
			const key = entry.slice(separator + 1);
			if (!candidateRoleSet.has(role)) {
				throw new Error(`${context}: rol de candidato inválido (${role})`);
			}
			if (!isStableKey(key)) {
				throw new Error(`${context}: clave de candidato inválida (${key})`);
			}
			return { role: role as CandidateRole, key };
		});

	if (references.length === 0) {
		throw new Error(`${context}: se esperaba al menos un candidato`);
	}

	const hasSelectableRole = references.some(({ role }) =>
		['primary', 'co-primary', 'pilot', 'none'].includes(role),
	);
	if (!hasSelectableRole) {
		throw new Error(`${context}: la regla no contiene candidato principal`);
	}
	if (
		references.some(({ role }) => role === 'none') &&
		references.some(({ role }) => role !== 'none')
	) {
		throw new Error(`${context}: none no puede combinarse con otros candidatos`);
	}

	return references;
}
