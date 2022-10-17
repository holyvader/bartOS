import { InjectableServiceImpl } from '@system/definitions/injectable-service.definition';
import { FileSystemService } from '@system-services/resource/modules/file-system/services/file-system.service';
import { InjectableServiceName } from '@system/definitions/injectable-service-manifest.definition';

export class ResourceService implements InjectableServiceImpl {
	constructor(public name: InjectableServiceName) {}
	init() {
		new FileSystemService().init();
		console.info('[resourceService] running. File system initialized');
	}
}
