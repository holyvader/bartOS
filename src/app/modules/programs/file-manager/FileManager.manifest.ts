import {
	programManifestDefinition,
	ProgramType
} from '@system/definitions/program-manifest.definition';
import { FileManager } from '@programs/file-manager/FileManager';
import { ModuleServiceName } from '@system/definitions/module-service-manifest.definition';
import { IconFiles } from '@ui/core/icons';
import { ProgramInstanceService } from '@services/program-instance/services/program-instance.service';

export default programManifestDefinition<[ProgramInstanceService]>({
	id: 'file-manager',
	title: 'File Manager',
	type: ProgramType.WINDOW,
	icon: IconFiles,
	definition: FileManager,
	dependencies: [ModuleServiceName.PROGRAM_INSTANCE],
	userExecutable: true
});
