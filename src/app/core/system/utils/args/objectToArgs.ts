// add more supported values in the future
import { Args, ArgsObject } from '@system/utils/args/args.definition';

export function objectToArgs<T extends ArgsObject = ArgsObject>(obj: T): Args {
	return Object.entries(obj)
		.reduce((acc, [key, value]) => {
			acc += ` --${key}="${value}"`;
			return acc;
		}, '')
		.trim();
}
