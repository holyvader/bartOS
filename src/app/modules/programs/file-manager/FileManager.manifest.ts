import {
	programManifestDefinition,
	ProgramType
} from '@system/definitions/program-manifest.definition';
import { FileManager } from '@programs/file-manager/FileManager';
import { ModuleServiceName } from '@system/definitions/module-service-manifest.definition';

export default programManifestDefinition({
	id: 'file-manager',
	title: 'File Manager',
	type: ProgramType.WINDOW,
	definition: FileManager,
	dependencies: [ModuleServiceName.RESOURCE],
	userExecutable: true
});
