import {
	ProgramManifest,
	ProgramInstanceManifest
} from '@system/definitions/program-manifest.definition';
import { ObservableService } from '@system/data/observable/observable.service';

let uniqueId = 1;

export class ProgramInstanceRegistry {
	private observable = new ObservableService<ProgramInstanceManifest>('pid');

	add(manifests: ProgramManifest[]) {
		this.observable.add(manifests.map(toExecutedProgramManifest));
		return this;
	}

	remove(pids: string[]) {
		this.observable.remove(pids);
		return this;
	}

	removeAll() {
		this.observable.removeAll();
		return this;
	}

	getAll() {
		return this.observable.getAll();
	}

	get(pid: string) {
		return this.observable.get(pid);
	}

	subscribe: ObservableService<ProgramInstanceManifest>['subscribe'] = (
		type,
		observer
	) => {
		return this.observable.subscribe(type, observer);
	};
}

function toExecutedProgramManifest(
	manifest: ProgramManifest
): ProgramInstanceManifest {
	return {
		...manifest,
		pid: `pid-${uniqueId++}`
	};
}
