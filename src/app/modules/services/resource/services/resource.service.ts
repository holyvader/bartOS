import { ModuleServiceImpl } from '@system/definitions/module-service.definition';
import { FileSystemService } from '../../resource/modules/file-system/services/file-system.service';
import { ModuleServiceName } from '@system/definitions/module-service-manifest.definition';
import { ResourceManagerService } from '@system/services/resource-manager/resource-manager.service';
import { system } from '@system/system';
import { SystemServiceName } from '@system/definitions/system-service.definition';
import { ObservableService } from '@system/data/observable/observable.service';
import { ResourceDefinition } from '@system/definitions/resource.definition';

export class ResourceService implements ModuleServiceImpl {
	private resourceManagerService?: ResourceManagerService;

	constructor(public name: ModuleServiceName) {
		this.resourceManagerService = system.systemServiceManager.getService(
			SystemServiceName.RESOURCE_MANAGER
		);
	}
	init() {
		// todo remove this
		new FileSystemService().init();
		console.info(
			`[resourceService] running. Files in system: ${this.resourceManagerService
				?.getAll()
				.map((it) => it.name)}`
		);
	}

	subscribe: ObservableService<ResourceDefinition>['subscribe'] = (
		type,
		observer
	) => {
		return (
			this.resourceManagerService?.subscribe(type, observer) ?? (() => true)
		);
	};
}
