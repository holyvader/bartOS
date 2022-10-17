import { InjectableServiceImpl } from '@system/definitions/injectable-service.definition';
import { system } from '@system/system';
import { InjectableServiceName } from '@system/definitions/injectable-service-manifest.definition';
import { ProgramRegistry } from '@system/registry/program.registry';

export class ProgramService implements InjectableServiceImpl {
	constructor(public name: InjectableServiceName) {}
	init() {
		console.info(
			`[programService] running. Registered Programs: ${Array.from(
				system.programManager.getAll()
			)
				.map((it) => it.id)
				.join(', ')}`
		);
	}

	getAll() {
		return system.programManager.getAll();
	}

	subscribe: ProgramRegistry['subscribe'] = (type, observer) => {
		return system.programManager.subscribe(type, observer);
	};
}
