import { InjectableServiceImpl } from '@system/definitions/injectable-service.definition';
import { system } from '@system/system';
import { InjectableServiceName } from '@system/definitions/injectable-service-manifest.definition';

export class ProgramExecutionService implements InjectableServiceImpl {
	constructor(public name: InjectableServiceName) {}
	private bootStartupPrograms() {
		const programsToStart = Array.from(system.programs.getAll()).filter(
			(it) => it.runOnStartup
		);
		system.renderedRegistry.add(programsToStart);
	}

	run() {
		console.info('[programExecutionService] running');
		this.bootStartupPrograms();
	}
	test() {
		return 'AAAAA';
	}
}
