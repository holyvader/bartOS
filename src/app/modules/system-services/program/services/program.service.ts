import { InjectableServiceImpl } from '@system/definitions/injectable-service.definition';
import { system } from '@system/system';
import { InjectableServiceName } from '@system/definitions/injectable-service-manifest.definition';

export class ProgramService implements InjectableServiceImpl {
	constructor(public name: InjectableServiceName) {}
	run() {
		console.info(
			`[programService] running. Registered Programs: ${Array.from(
				system.programs.getAll()
			)
				.map((it) => it.id)
				.join(', ')}`
		);
	}
}
