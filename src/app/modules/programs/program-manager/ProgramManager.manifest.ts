import {
	programManifestDefinition,
	ProgramType
} from '@system/definitions/program-manifest.definition';
import { ProgramManager } from '@programs/program-manager/ProgramManager';
import { ModuleServiceName } from '@system/definitions/module-service-manifest.definition';
import { ProgramInstanceService } from '@services/program-instance/services/program-instance.service';
import { IconAtom } from '@ui/core/icons';

export default programManifestDefinition<[ProgramInstanceService]>({
	id: 'program-manager',
	title: 'Program Manager',
	type: ProgramType.WINDOW,
	icon: IconAtom,
	definition: ProgramManager,
	dependencies: [ModuleServiceName.PROGRAM_INSTANCE],
	userExecutable: true
});
