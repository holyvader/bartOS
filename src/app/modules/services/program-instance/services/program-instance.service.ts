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

export class ProgramInstanceService implements ModuleServiceImpl {
	private programManager?: ProgramManagerService;
	private programInstanceManager?: ProgramInstanceManagerService;
	private windowManager?: WindowManagerService;

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

	close(pid: string) {
		this.windowManager?.remove(pid);
		this.programInstanceManager?.remove(pid);
	}
}
