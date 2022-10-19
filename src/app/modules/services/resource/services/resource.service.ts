import { ModuleServiceImpl } from '@system/definitions/module-service.definition';
import { FileSystemService } from '../../resource/modules/file-system/services/file-system.service';
import { ModuleServiceName } from '@system/definitions/module-service-manifest.definition';

export class ResourceService implements ModuleServiceImpl {
	constructor(public name: ModuleServiceName) {}
	init() {
		new FileSystemService().init();
		console.info('[resourceService] running. File system initialized');
	}
}
