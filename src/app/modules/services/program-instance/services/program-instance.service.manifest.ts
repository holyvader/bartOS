import {
	moduleServiceManifestDefinition,
	ModuleServiceName
} from '@system/definitions/module-service-manifest.definition';
import { ProgramInstanceService } from './program-instance.service';

export default moduleServiceManifestDefinition({
	id: ModuleServiceName.PROGRAM_INSTANCE,
	system: true,
	injectable: true,
	definition: ProgramInstanceService
});
