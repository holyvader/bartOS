import { Folder, ResourcePath } from '@system/definitions/resource.definition';
import { PATH_SEPARATOR } from '@system/utils/resources/path/pathSeparator';

export function getFolderPath(folder: Folder): ResourcePath {
	return `${folder.path}${
		folder.path.slice(-1) === PATH_SEPARATOR ? '' : PATH_SEPARATOR
	}${folder.name}`;
}
