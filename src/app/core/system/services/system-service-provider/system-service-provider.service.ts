import { ProgramInstanceManagerService } from '@system/services/program-instance-manager/program-instance-manager.service';
import { ProgramManagerService } from '@system/services/program-manager/program-manager.service';
import { ResourceManagerService } from '@system/services/resource-manager/resource-manager.service';
import { SystemServiceName } from '@system/definitions/system-service.definition';

export class SystemServiceProviderService {
	constructor(
		private programInstanceManager: ProgramInstanceManagerService,
		private programManager: ProgramManagerService,
		private resourceManager: ResourceManagerService
	) {}

	getService<NAME extends SystemServiceName>(
		name: NAME
	): SystemService[NAME] | undefined {
		// todo permission check
		switch (name) {
			case SystemServiceName.PROGRAM_INSTANCE_MANAGER:
				return this.programInstanceManager as SystemService[NAME];
			case SystemServiceName.PROGRAM_MANAGER:
				return this.programManager as SystemService[NAME];
			case SystemServiceName.RESOURCE_MANAGER:
				return this.resourceManager as SystemService[NAME];
		}
	}
}

interface SystemService {
	[SystemServiceName.PROGRAM_MANAGER]: ProgramManagerService;
	[SystemServiceName.PROGRAM_INSTANCE_MANAGER]: ProgramInstanceManagerService;
	[SystemServiceName.RESOURCE_MANAGER]: ResourceManagerService;
}
