import {
	moduleServiceManifestDefinition,
	ModuleServiceName
} from '@system/definitions/module-service-manifest.definition';
import { ProgramExecutionService } from '../../program-execution/services/program-execution.service';

export default moduleServiceManifestDefinition({
	id: ModuleServiceName.PROGRAM_EXECUTION,
	system: true,
	injectable: true,
	definition: ProgramExecutionService
});
