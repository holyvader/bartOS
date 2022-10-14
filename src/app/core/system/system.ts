import { InjectableServiceRegistry } from '@system/registry/injectable-service.registry';
import { ProgramRegistry } from '@system/registry/program.registry';
import { ResourceRegistry } from '@system/registry/resource.registry';
import { ProgramRendererRegistry } from '@system/registry/program-renderer.registry';
import { InjectableServiceName } from '@system/definitions/injectable-service-manifest.definition';
import { InjectableServiceImpl } from '@system/definitions/injectable-service.definition';

class System {
	constructor(
		public services: InjectableServiceRegistry,
		public programs: ProgramRegistry,
		public renderedRegistry: ProgramRendererRegistry,
		public resources: ResourceRegistry
	) {}

	boot() {
		this.bootServices();
	}

	bootServices() {
		for (const service of this.services.getAll()) {
			new service.definition(service.id).run();
		}
	}

	getInjectableService(
		serviceName: InjectableServiceName
	): InjectableServiceImpl | undefined {
		// todo check permissions
		const service = this.services.get(serviceName);
		if (service) {
			return new service.definition(service.id);
		}
		return undefined;
	}

	// todo move to program execution service
	subscribeToExecutedPrograms: ProgramRendererRegistry['subscribe'] = (
		type,
		observer
	) => {
		return this.renderedRegistry.subscribe(type, observer);
	};
}

export const system = new System(
	new InjectableServiceRegistry(),
	new ProgramRegistry(),
	new ProgramRendererRegistry(),
	new ResourceRegistry()
);
