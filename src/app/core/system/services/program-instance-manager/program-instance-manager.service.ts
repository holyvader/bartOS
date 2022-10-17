import { ProgramInstanceRegistry } from '@system/registry/program-instance.registry';
import { ProgramManifest } from '@system/definitions/program-manifest.definition';

export class ProgramInstanceManagerService {
	constructor(private programsToRender: ProgramInstanceRegistry) {
	}

	add(manifests: ProgramManifest[]) {
		this.programsToRender.add(manifests);
		return this;
	}

	getAll() {
		return this.programsToRender.getAll();
	}

	get(pid: string) {
		return this.programsToRender.get(pid);
	}

	removeAll() {
		this.programsToRender.remove(Array.from(this.getAll()).map( it => it.pid));
	}

	subscribe: ProgramInstanceRegistry['subscribe'] = (type, observer) => {
		return this.programsToRender.subscribe(type, observer);
	};
}
