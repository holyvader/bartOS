import {
	programManifestDefinition,
	ProgramType
} from '@system/definitions/program-manifest.definition';
import { ProgramManager } from '@programs/program-manager/ProgramManager';
import { ModuleServiceName } from '@system/definitions/module-service-manifest.definition';

export default programManifestDefinition({
	id: 'program-manager',
	title: 'Program Manager',
	type: ProgramType.WINDOW,
	definition: ProgramManager,
	dependencies: [ModuleServiceName.PROGRAM_EXECUTION],
	userExecutable: true
});
