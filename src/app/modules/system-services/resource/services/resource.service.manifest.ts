import {
	injectableServiceManifestDefinition,
	InjectableServiceName
} from '@system/definitions/injectable-service-manifest.definition';
import { ResourceService } from '@system-services/resource/services/resource.service';

export default injectableServiceManifestDefinition({
	id: InjectableServiceName.RESOURCE,
	system: true,
	injectable: true,
	definition: ResourceService
});
