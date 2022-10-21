import {
	moduleServiceManifestDefinition,
	ModuleServiceName
} from '@system/definitions/module-service-manifest.definition';
import { WindowService } from '@services/window/services/window.service';

export default moduleServiceManifestDefinition({
	id: ModuleServiceName.WINDOW,
	system: true,
	injectable: true,
	definition: WindowService
});
