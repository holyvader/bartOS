import { InjectableServiceImpl } from '@system/definitions/injectable-service.definition';
import { system } from '@system/system';
import { InjectableServiceName } from '@system/definitions/injectable-service-manifest.definition';
import { ProgramInstanceRegistry } from '@system/registry/program-instance.registry';
import { ProgramManifest } from '@system/definitions/program-manifest.definition';

export class ProgramExecutionService implements InjectableServiceImpl {
	constructor(public name: InjectableServiceName) {}

	private findManifestById(id: string): ProgramManifest | undefined {
		return system.programManager.get(id);
	}

	init() {
		const programsToStart = Array.from(system.programManager.getAll()).filter(
			(it) => it.runOnStartup
		);
		system.programInstanceManager.add(programsToStart);
	}

	subscribe: ProgramInstanceRegistry['subscribe'] = (type, observer) => {
		return system.programInstanceManager.subscribe(type, observer);
	};

	getAll() {
		return system.programInstanceManager.getAll();
	}

	execute(id: string) {
		const program = this.findManifestById(id);
		console.info(`program to run: ${id}`, program);
		if (program) {
			system.programInstanceManager.add([program]);
		}
	}
}
