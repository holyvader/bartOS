import {
	injectableServiceManifestDefinition,
	InjectableServiceName
} from '@system/definitions/injectable-service-manifest.definition';
import { ProgramExecutionService } from '@system-services/program-execution/services/program-execution.service';

export default injectableServiceManifestDefinition({
	id: InjectableServiceName.PROGRAM_EXECUTION,
	system: true,
	injectable: true,
	definition: ProgramExecutionService
});
