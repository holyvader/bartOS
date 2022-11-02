interface FilterNotEmptyOptions {
	removeEmptyStrings?: boolean;
	removeEmptyArrays?: boolean;
}

export function filterNotEmpty<MODEL>(
	values?: (MODEL | undefined | null | false)[],
	options?: FilterNotEmptyOptions
): MODEL[] {
	return (values ?? []).filter((value) => notEmpty(value, options)) as MODEL[];
}

function notEmpty<MODEL>(value: MODEL | null | undefined | false, options?: FilterNotEmptyOptions): value is MODEL {
	return !(
		value === null ||
		value === undefined ||
		value === false ||
		(options?.removeEmptyStrings && typeof value === 'string' && value.trim() === '') ||
		(options?.removeEmptyArrays && Array.isArray(value) && value?.length === 0)
	);
}
