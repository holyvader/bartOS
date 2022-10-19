import {
	moduleServiceManifestDefinition,
	ModuleServiceName
} from '@system/definitions/module-service-manifest.definition';
import { UserService } from '../../user/services/user.service';

export default moduleServiceManifestDefinition({
	id: ModuleServiceName.USER,
	system: true,
	injectable: true,
	definition: UserService
});
