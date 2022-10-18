import { InjectableServiceImpl } from '@system/definitions/injectable-service.definition';
import { system } from '@system/system';
import { InjectableServiceName } from '@system/definitions/injectable-service-manifest.definition';
import { ProgramInstanceRegistry } from '@system/registry/program-instance.registry';
import { ProgramManifest } from '@system/definitions/program-manifest.definition';
import { ProgramManagerService } from '@system/services/program-manager/program-manager.service';
import { ProgramInstanceManagerService } from '@system/services/program-instance-manager/program-instance-manager.service';
import { SystemServiceName } from '@system/definitions/system-service.definition';

export class ProgramExecutionService implements InjectableServiceImpl {
	private programManager?: ProgramManagerService;
	private programInstanceManager?: ProgramInstanceManagerService;

	constructor(public name: InjectableServiceName) {
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
		const programsToStart = Array.from(
			this.programManager?.getAll() ?? []
		).filter((it) => it.runOnStartup);
		this.programInstanceManager?.add(programsToStart);
	}

	subscribe: ProgramInstanceRegistry['subscribe'] = (type, observer) => {
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
