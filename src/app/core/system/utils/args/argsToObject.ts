import { ArgsObject } from '@system/utils/args/args.definition';

export function argsToObject(args: string): ArgsObject {
	const argsArr = args.split(' ').map((it) => it.replace('--', '').split('='));

	return argsArr.reduce<Record<string, string | number | boolean>>(
		(acc, [key, value]) => {
			if (isBoolean(value)) {
				acc[key] = toBoolean(value);
			} else if (isNumber(value)) {
				acc[key] = toNumber(value);
			} else {
				acc[key] = value;
			}
			return acc;
		},
		{}
	);
}

function isBoolean(value: string) {
	const val = value.toLocaleLowerCase();
	return ['false', 'true'].includes(val);
}
function toBoolean(value: string) {
	const val = value.toLocaleLowerCase();
	return val === 'true';
}
function isNumber(value: string) {
	const val = parseInt(value.toLocaleLowerCase());
	return typeof val === 'number' && !isNaN(val);
}
function toNumber(value: string) {
	const val = value.toLocaleLowerCase();
	return parseInt(val, 10);
}
