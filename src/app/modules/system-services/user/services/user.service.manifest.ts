import {
	injectableServiceManifestDefinition,
	InjectableServiceName
} from '@system/definitions/injectable-service-manifest.definition';
import { UserService } from '@system-services/user/services/user.service';

export default injectableServiceManifestDefinition({
	id: InjectableServiceName.USER,
	system: true,
	injectable: true,
	definition: UserService
});
