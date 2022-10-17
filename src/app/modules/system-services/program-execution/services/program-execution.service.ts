import { InjectableServiceImpl } from '@system/definitions/injectable-service.definition';
import { system } from '@system/system';
import { InjectableServiceName } from '@system/definitions/injectable-service-manifest.definition';
import { ExecutedProgramRegistry } from '@system/registry/executed-program.registry';
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
		system.executedProgramManager.add(programsToStart);
	}

	subscribe: ExecutedProgramRegistry['subscribe'] = (type, observer) => {
		return system.executedProgramManager.subscribe(type, observer);
	};

	executeProgram(id: string) {
		const program = this.findManifestById(id);
		console.info(`program to run: ${id}`, program);
		if (program) {
			system.executedProgramManager.add([program]);
		}
	}
}
