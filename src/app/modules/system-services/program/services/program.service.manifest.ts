import {
	injectableServiceManifestDefinition,
	InjectableServiceName
} from '@system/definitions/injectable-service-manifest.definition';
import { ProgramService } from './program.service';

export default injectableServiceManifestDefinition({
	id: InjectableServiceName.PROGRAM,
	system: true,
	injectable: true,
	definition: ProgramService
});
