import { ProgramRegistry } from '@system/registry/program.registry';

export class ProgramManagerService {
	constructor(private programsToRender: ProgramRegistry) {
	}

	subscribe: ProgramRegistry['subscribe'] = (type, observer) => {
		return this.programsToRender.subscribe(type, observer);
	};

	getAll() {
		return this.programsToRender.getAll();
	}
	get(id: string) {
		return this.programsToRender.get(id);
	}

}
