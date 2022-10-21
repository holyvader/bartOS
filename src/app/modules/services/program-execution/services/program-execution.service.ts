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

export class ProgramExecutionService implements ModuleServiceImpl {
	private programManager?: ProgramManagerService;
	private programInstanceManager?: ProgramInstanceManagerService;

	constructor(public name: ModuleServiceName) {
		this.programManager = system.systemServiceManager.getService(
			SystemServiceName.PROGRAM_MANAGER
		);
		this.programInstanceManager = system.systemServiceManager.getService(
			SystemServiceName.PROGRAM_INSTANCE_MANAGER
		);
	}

	private findManifestById(id: string): ProgramManifest | undefined {
		return this.programManager?.get(id);
	}

	init() {
		const programsToStart = (this.programManager?.getAll() ?? []).filter(
			(it) => it.runOnStartup
		);
		console.info('added this program');
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

	execute(id: string) {
		const program = this.findManifestById(id);
		if (program) {
			this.programInstanceManager?.add([program]);
		}
	}
}
