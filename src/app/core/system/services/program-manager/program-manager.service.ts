import { ProgramRegistry } from '@system/registry/program.registry';

export class ProgramManagerService {
	constructor(private programRegistry: ProgramRegistry) {}

	subscribe: ProgramRegistry['subscribe'] = (type, observer) => {
		return this.programRegistry.subscribe(type, observer);
	};

	getAll() {
		return this.programRegistry.getAll();
	}
	get(id: string) {
		return this.programRegistry.get(id);
	}
}
