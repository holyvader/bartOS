export function classNameMerge(records: Record<string, boolean>): string {
	return Object.entries(records)
		.reduce<string>((acc, [key, isTrue]) => {
			if (isTrue) {
				acc += `${key} `;
			}
			return acc;
		}, '')
		.trimEnd();
}
