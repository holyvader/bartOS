import { Folder, ResourcePath } from '@system/definitions/resource.definition';
import { PATH_SEPARATOR } from '@system/utils/resources/path/pathSeparator';

export function getFolderPath(
	folder: Pick<Folder, 'path' | 'name'>
): ResourcePath {
	return `${folder.path}${
		folder.path.slice(-1) === PATH_SEPARATOR ? '' : PATH_SEPARATOR
	}${folder.name}`;
}
