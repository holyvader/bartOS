import { ModuleServiceImpl } from '@system/definitions/module-service.definition';
import { system } from '@system/system';
import { ModuleServiceName } from '@system/definitions/module-service-manifest.definition';
import { ProgramManagerService } from '@system/services/program-manager/program-manager.service';
import { SystemServiceName } from '@system/definitions/system-service.definition';
import { ObservableService } from '@system/data/observable/observable.service';
import { ProgramManifest } from '@system/definitions/program-manifest.definition';

export class ProgramService implements ModuleServiceImpl {
	private programManager?: ProgramManagerService;

	constructor(public name: ModuleServiceName) {
		this.programManager = system.systemServiceManager.getService(
			SystemServiceName.PROGRAM_MANAGER
		);
	}
	init() {
		console.info(
			`[programService] running. Registered Programs: ${(
				this.programManager?.getAll() ?? []
			)
				.map((it) => it.id)
				.join(', ')}`
		);
	}

	getAll() {
		return this.programManager?.getAll() ?? [];
	}

	subscribe: ObservableService<ProgramManifest>['subscribe'] = (
		type,
		observer
	) => {
		return this.programManager?.subscribe(type, observer) ?? (() => true);
	};
}
