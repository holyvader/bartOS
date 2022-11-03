// add more supported values in the future
import { ArgsObject } from '@system/utils/args/args.definition';

export function objectToArgs(obj: ArgsObject) {
	return Object.entries(obj)
		.reduce((acc, [key, value]) => {
			acc += ` --${key}=${value}`;
			return acc;
		}, '')
		.trim();
}
