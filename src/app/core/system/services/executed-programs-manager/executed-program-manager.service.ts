import { ExecutedProgramRegistry } from '@system/registry/executed-program.registry';
import { ProgramManifest } from '@system/definitions/program-manifest.definition';

export class ExecutedProgramManagerService {
	constructor(private programsToRender: ExecutedProgramRegistry) {
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

	subscribe: ExecutedProgramRegistry['subscribe'] = (type, observer) => {
		return this.programsToRender.subscribe(type, observer);
	};
}
