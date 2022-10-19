import {
	moduleServiceManifestDefinition,
	ModuleServiceName
} from '@system/definitions/module-service-manifest.definition';
import { ResourceService } from '../../resource/services/resource.service';

export default moduleServiceManifestDefinition({
	id: ModuleServiceName.RESOURCE,
	system: true,
	injectable: true,
	definition: ResourceService
});
