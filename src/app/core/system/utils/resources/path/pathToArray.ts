import { ResourcePath } from '@system/definitions/resource.definition';
import { PATH_SEPARATOR } from '@system/utils/resources/path/pathSeparator';
import { filterNotEmpty } from '@system/utils/data/collection/filter-not-empty';

export function pathToArray(path: ResourcePath): string[] {
	return filterNotEmpty(path.split(PATH_SEPARATOR), {
		removeEmptyStrings: true
	});
}
