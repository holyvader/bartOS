import {
	programManifestDefinition,
	ProgramType
} from '@system/definitions/program-manifest.definition';
import { Desktop } from '@system-programs/desktop/Desktop';
import { InjectableServiceName } from '@system/definitions/injectable-service-manifest.definition';
import { ProgramExecutionService } from '@system-services/program-execution/services/program-execution.service';
import { ProgramService } from '@system-services/program/services/program.service';

export default programManifestDefinition<[ProgramExecutionService, ProgramService]>({
	id: 'desktop',
	title: 'Desktop',
	type: ProgramType.PURE,
	definition: Desktop,
	dependencies: [InjectableServiceName.PROGRAM_EXECUTION, InjectableServiceName.PROGRAM],
	runOnStartup: true
});
