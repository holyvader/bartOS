import { ProgramInstanceManagerService } from '@system/services/program-instance-manager/program-instance-manager.service';
import { ProgramManagerService } from '@system/services/program-manager/program-manager.service';
import { ResourceManagerService } from '@system/services/resource-manager/resource-manager.service';
import { SystemServiceName } from '@system/definitions/system-service.definition';
import { WindowManagerService } from '@system/services/window-manager/window-manager.service';

export class SystemServiceProviderService {
	constructor(
		private programInstanceManager: ProgramInstanceManagerService,
		private programManager: ProgramManagerService,
		private resourceManager: ResourceManagerService,
		private windowManager: WindowManagerService
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
			case SystemServiceName.WINDOW_MANAGER:
				return this.windowManager as SystemService[NAME];
		}
	}
}

interface SystemService {
	[SystemServiceName.PROGRAM_MANAGER]: ProgramManagerService;
	[SystemServiceName.PROGRAM_INSTANCE_MANAGER]: ProgramInstanceManagerService;
	[SystemServiceName.RESOURCE_MANAGER]: ResourceManagerService;
	[SystemServiceName.WINDOW_MANAGER]: WindowManagerService;
}
