import { ModuleServiceImpl } from '@system/definitions/module-service.definition';
import { system } from '@system/system';
import { ModuleServiceName } from '@system/definitions/module-service-manifest.definition';
import {
	ProgramInstanceManifest,
	ProgramManifest
} from '@system/definitions/program-manifest.definition';
import { ProgramManagerService } from '@system/services/program-manager/program-manager.service';
import { ProgramInstanceManagerService } from '@system/services/program-instance-manager/program-instance-manager.service';
import { SystemServiceName } from '@system/definitions/system-service.definition';
import { ObservableService } from '@system/data/observable/observable.service';
import { WindowManagerService } from '@system/services/window-manager/window-manager.service';
import { ResourceManagerService } from '@system/services/resource-manager/resource-manager.service';
import {
	ResourceArgs,
	ResourceDefinition,
	RID
} from '@system/definitions/resource.definition';
import { DEFAULT_PROGRAMS } from '@services/program-instance/services/DEFAULT_PROGRAMS';
import { objectToArgs } from '@system/utils/args/objectToArgs';
import { isFolder } from '@system/utils/resources/type/isFolder';

export class ProgramInstanceService implements ModuleServiceImpl {
	private programManager?: ProgramManagerService;
	private programInstanceManager?: ProgramInstanceManagerService;
	private windowManager?: WindowManagerService;
	private resourceManager?: ResourceManagerService;

	constructor(public name: ModuleServiceName) {
		this.programManager = system.systemServiceManager.getService(
			SystemServiceName.PROGRAM_MANAGER
		);
		this.programInstanceManager = system.systemServiceManager.getService(
			SystemServiceName.PROGRAM_INSTANCE_MANAGER
		);
		this.windowManager = system.systemServiceManager.getService(
			SystemServiceName.WINDOW_MANAGER
		);
		this.resourceManager = system.systemServiceManager.getService(
			SystemServiceName.RESOURCE_MANAGER
		);
	}

	private findManifestById(id: string): ProgramManifest | undefined {
		return this.programManager?.get(id);
	}

	init() {
		const programsToStart = (this.programManager?.getAll() ?? []).filter(
			(it) => it.runOnStartup
		);
		this.programInstanceManager?.add(programsToStart);
	}

	subscribe: ObservableService<ProgramInstanceManifest>['subscribe'] = (
		type,
		observer
	) => {
		return (
			this.programInstanceManager?.subscribe(type, observer) ?? (() => true)
		);
	};

	getAll() {
		return this.programInstanceManager?.getAll() ?? [];
	}

	execute(id: string, args?: string) {
		const program = this.findManifestById(id);
		if (program) {
			this.programInstanceManager?.add([{ ...program, args }]);
		}
	}

	openResource(resource: ResourceDefinition, args?: string) {
		const resourceArgs: ResourceArgs = {
			rid: resource.rid,
			path: resource.path,
			name: resource.name,
			type: resource.type
		};
		const programArgs = objectToArgs(resourceArgs);
		const programId = DEFAULT_PROGRAMS.get(resource.type);
		const program = programId ? this.findManifestById(programId) : undefined;

		if (program) {
			this.programInstanceManager?.add([
				{ ...program, args: `${programArgs} ${args ?? ''}`.trim() }
			]);
		}
	}

	close(pid: string) {
		this.windowManager?.remove(pid);
		this.programInstanceManager?.remove(pid);
	}
}
