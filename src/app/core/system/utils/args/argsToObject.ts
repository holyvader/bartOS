import { Args, ArgsObject } from '@system/utils/args/args.definition';

export function argsToObject<T extends ArgsObject = ArgsObject>(args: Args): T {
	const argsArr = args
		.replaceAll(' --', ';--')
		.split(';')
		.map((it) => it.replace('--', '').replaceAll('"', '').split('='));
	return argsArr.reduce<ArgsObject>((acc, [key, value]) => {
		if (isBoolean(value)) {
			acc[key] = toBoolean(value);
		} else if (isNumber(value)) {
			acc[key] = toNumber(value);
		} else {
			acc[key] = value;
		}
		return acc;
	}, {} as ArgsObject) as T;
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
