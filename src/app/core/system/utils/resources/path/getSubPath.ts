import { ResourcePath } from '@system/definitions/resource.definition';
import { PATH_SEPARATOR } from '@system/utils/resources/path/pathSeparator';
import { HOME_PATH } from '@system/utils/resources/path/homePath';
import { filterNotEmpty } from '@system/data/collection/filter-not-empty';

export function getSubPath(
	path: ResourcePath,
	part: -1 | number
): ResourcePath {
	const pathArr = filterNotEmpty(path.split(PATH_SEPARATOR), {
		removeEmptyStrings: true
	});

	if (pathArr.length < part) {
		console.error(`Sub-path "${part}" for given path "${path}" doesn't exist.`);
		return HOME_PATH;
	}
	const level = part === -1 ? pathArr.length - 1 : part;

	return `${PATH_SEPARATOR}${pathArr
		.slice(0, level)
		.join(PATH_SEPARATOR)}` as ResourcePath;
}

export function getParentPath(path: ResourcePath) {
	return getSubPath(path, -1);
}
