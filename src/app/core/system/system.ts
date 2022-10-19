import { ModuleServiceRegistry } from '@system/registry/module-service.registry';
import { ProgramRegistry } from '@system/registry/program.registry';
import { ResourceRegistry } from '@system/registry/resource.registry';
import { ProgramInstanceRegistry } from '@system/registry/program-instance.registry';
import { ModuleServiceProviderService } from '@system/services/module-service-provider/module-service-provider.service';
import { ProgramInstanceManagerService } from '@system/services/program-instance-manager/program-instance-manager.service';
import { ModuleServiceManifest } from '@system/definitions/module-service-manifest.definition';
import { ProgramManifest } from '@system/definitions/program-manifest.definition';
import { ResourceDefinition } from '@system/definitions/resource.definition';
import { ProgramManagerService } from '@system/services/program-manager/program-manager.service';
import { ResourceManagerService } from '@system/services/resource-manager/resource-manager.service';
import { SystemServiceProviderService } from '@system/services/system-service-provider/system-service-provider.service';

interface BootOptions {
	systemServices: ModuleServiceManifest[];
	systemPrograms: ProgramManifest[];
	resources: ResourceDefinition[];
}

export class System {
	public moduleServiceManager: ModuleServiceProviderService;
	public systemServiceManager: SystemServiceProviderService;
	protected programInstanceManager: ProgramInstanceManagerService;
	protected programManager: ProgramManagerService;
	protected resourceManager: ResourceManagerService;

	constructor(
		protected services: ModuleServiceRegistry,
		protected programs: ProgramRegistry,
		protected programRendererRegistry: ProgramInstanceRegistry,
		protected resources: ResourceRegistry
	) {
		this.moduleServiceManager = new ModuleServiceProviderService(services);
		this.programInstanceManager = new ProgramInstanceManagerService(
			programRendererRegistry
		);
		this.programManager = new ProgramManagerService(programs);
		this.resourceManager = new ResourceManagerService(resources);
		this.systemServiceManager = new SystemServiceProviderService(
			this.programInstanceManager,
			this.programManager,
			this.resourceManager
		);
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
	new ModuleServiceRegistry(),
	new ProgramRegistry(),
	new ProgramInstanceRegistry(),
	new ResourceRegistry()
);
