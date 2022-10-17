import {
	programManifestDefinition,
	ProgramType
} from '@system/definitions/program-manifest.definition';
import { ProgramManager } from '@system-programs/program-manager/ProgramManager';
import { InjectableServiceName } from '@system/definitions/injectable-service-manifest.definition';

export default programManifestDefinition({
	id: 'program-manager',
	title: 'Program Manager',
	type: ProgramType.WINDOW,
	definition: ProgramManager,
	dependencies: [InjectableServiceName.PROGRAM_EXECUTION],
	userExecutable: true
});
