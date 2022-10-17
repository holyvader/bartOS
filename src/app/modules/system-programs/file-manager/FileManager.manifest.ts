import {
	programManifestDefinition,
	ProgramType
} from '@system/definitions/program-manifest.definition';
import { FileManager } from '@system-programs/file-manager/FileManager';
import { InjectableServiceName } from '@system/definitions/injectable-service-manifest.definition';

export default programManifestDefinition({
	id: 'file-manager',
	title: 'File Manager',
	type: ProgramType.WINDOW,
	definition: FileManager,
	dependencies: [InjectableServiceName.RESOURCE],
	userExecutable: true
});
