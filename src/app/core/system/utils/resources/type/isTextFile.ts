import {
	Folder,
	ResourceDefinition,
	TextFile
} from '@system/definitions/resource.definition';

export function isTextFile(resource: ResourceDefinition): resource is TextFile {
	return resource.type === 'txt';
}
