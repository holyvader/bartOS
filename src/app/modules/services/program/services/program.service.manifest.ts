import {
	moduleServiceManifestDefinition,
	ModuleServiceName
} from '@system/definitions/module-service-manifest.definition';
import { ProgramService } from './program.service';

export default moduleServiceManifestDefinition({
	id: ModuleServiceName.PROGRAM,
	system: true,
	injectable: true,
	definition: ProgramService
});
