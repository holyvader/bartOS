import { ResourceType } from '@system/definitions/resource.definition';
import fileManagerManifest from '@programs/file-manager/FileManager.manifest';
import notepadManifest from '@programs/notepad/Notepad.manifest';

// should be dynamic. Static for now
export const DEFAULT_PROGRAMS = new Map<ResourceType, string>([
	['dir', fileManagerManifest.id],
	['txt', notepadManifest.id]
]);
