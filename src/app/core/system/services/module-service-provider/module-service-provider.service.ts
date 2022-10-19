import { ModuleServiceImpl } from '@system/definitions/module-service.definition';
import { ModuleServiceName } from '@system/definitions/module-service-manifest.definition';
import { ModuleServiceRegistry } from '@system/registry/module-service.registry';

export class ModuleServiceProviderService {
	constructor(private services: ModuleServiceRegistry) {}

	getInstance(name: ModuleServiceName): ModuleServiceImpl | undefined {
		const service = this.services.get(name);
		if (!service) {
			return undefined;
		}
		return new service.definition(service.id);
	}
}
