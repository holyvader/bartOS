import { InjectableServiceRegistry } from '@system/registry/injectable-service.registry';
import { ProgramRegistry } from '@system/registry/program.registry';
import { ResourceRegistry } from '@system/registry/resource.registry';
import { ProgramInstanceRegistry } from '@system/registry/program-instance.registry';
import { ServiceManagerService } from '@system/services/service-manager/service-manager.service';
import {
	ProgramInstanceManagerService
} from '@system/services/program-instance-manager/program-instance-manager.service';
import { InjectableServiceManifest } from '@system/definitions/injectable-service-manifest.definition';
import { ProgramManifest } from '@system/definitions/program-manifest.definition';
import { ResourceDefinition } from '@system/definitions/resource.definition';
import { ProgramManagerService } from '@system/services/program-manager/program-manager.service';
import { ResourceManagerService } from '@system/services/resource-manager/resource-manager.service';


interface BootOptions {
	systemServices: InjectableServiceManifest[];
	systemPrograms: ProgramManifest[];
	resources: ResourceDefinition[]
}

export class System {
	public serviceManager: ServiceManagerService;
	public programInstanceManager: ProgramInstanceManagerService;
	public programManager: ProgramManagerService;
	public resourceManager: ResourceManagerService;

	constructor(
		protected services: InjectableServiceRegistry,
		protected programs: ProgramRegistry,
		protected programRendererRegistry: ProgramInstanceRegistry,
		protected resources: ResourceRegistry
	) {
		this.serviceManager = new ServiceManagerService(services);
		this.programInstanceManager = new ProgramInstanceManagerService(programRendererRegistry);
		this.programManager = new ProgramManagerService(programs);
		this.resourceManager = new ResourceManagerService(resources);
	}

	boot(options: BootOptions) {
		this.services.register(options.systemServices);
		this.programs.register(options.systemPrograms);
		this.resources.register(options.resources);
		this.bootServices();
	}

	private bootServices() {
		for (const service of this.services.getAll()) {
			new service.definition(service.id).init();
		}
	}
}

export const system = new System(
	new InjectableServiceRegistry(),
	new ProgramRegistry(),
	new ProgramInstanceRegistry(),
	new ResourceRegistry()
);
