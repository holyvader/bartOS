import { ProgramInstanceRegistry } from '@system/registry/program-instance.registry';
import { ProgramManifest } from '@system/definitions/program-manifest.definition';

export class ProgramInstanceManagerService {
	constructor(private programInstanceRegistry: ProgramInstanceRegistry) {}

	add(manifests: ProgramManifest[]) {
		this.programInstanceRegistry.add(manifests);
		return this;
	}

	getAll() {
		return this.programInstanceRegistry.getAll();
	}

	get(pid: string) {
		return this.programInstanceRegistry.get(pid);
	}

	remove(pid: string) {
		this.programInstanceRegistry.remove(
			this.getAll()
				.filter((it) => it.pid === pid)
				.map((it) => it.pid)
		);
	}

	subscribe: ProgramInstanceRegistry['subscribe'] = (type, observer) => {
		return this.programInstanceRegistry.subscribe(type, observer);
	};
}
