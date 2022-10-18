import {
	ProgramManifest,
	ProgramInstanceManifest
} from '@system/definitions/program-manifest.definition';
import { ObservableService } from '@system/data/observable/observable.service';
import { InjectableServiceImpl } from '@system/definitions/injectable-service.definition';

let uniqueId = 1;

export class ProgramInstanceRegistry {
	private observable = new ObservableService<ProgramInstanceManifest<InjectableServiceImpl[]>>('pid');

	add(manifests: ProgramManifest[]) {
		this.observable.add(manifests.map(toExecutedProgramManifest));
		return this;
	}

	remove(pids: string[]) {
		this.observable.remove(pids);
		return this;
	}

	getAll() {
		return this.observable.getAll();
	}

	get(pid: string) {
		return this.observable.get(pid);
	}

	subscribe: ObservableService<ProgramInstanceManifest<InjectableServiceImpl[]>>['subscribe'] = (
		type,
		observer
	) => {
		return this.observable.subscribe(type, observer);
	};
}

function toExecutedProgramManifest(
	manifest: ProgramManifest
): ProgramInstanceManifest<InjectableServiceImpl[]> {
	return {
		...manifest,
		pid: `pid-${uniqueId++}`
	};
}
