import {
	Folder,
	ResourceDefinition
} from '@system/definitions/resource.definition';

export function isFolder(resource: ResourceDefinition): resource is Folder {
	return resource.type === 'dir';
}
