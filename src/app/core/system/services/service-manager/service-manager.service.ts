import { InjectableServiceImpl } from '@system/definitions/injectable-service.definition';
import { InjectableServiceName } from '@system/definitions/injectable-service-manifest.definition';
import { InjectableServiceRegistry } from '@system/registry/injectable-service.registry';

export class ServiceManagerService {
	constructor(private services: InjectableServiceRegistry) {
	}

	getInstance(name: InjectableServiceName): InjectableServiceImpl | undefined {
		const service = this.services.get(name);
		if (service) {
			return new service.definition(service.id);
		}
		return undefined;
	}
}