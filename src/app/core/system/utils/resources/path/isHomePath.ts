import { ResourcePath } from '@system/definitions/resource.definition';
import { HOME_PATH } from '@system/utils/resources/path/homePath';

export function isHomePath(path: ResourcePath): boolean {
	return path === HOME_PATH;
}
