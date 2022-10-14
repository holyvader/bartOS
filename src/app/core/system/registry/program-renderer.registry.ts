import {
	ProgramManifest,
	RenderedProgramManifest
} from '@system/definitions/program-manifest.definition';
import { ObservableService } from '@system/data/observable/observable.service';

let uniqueId = 1;

export class ProgramRendererRegistry {
	private observable = new ObservableService<RenderedProgramManifest>('pid');

	add(manifests: ProgramManifest[]) {
		this.observable.add(manifests.map(toExecutedProgramManifest));
		return this;
	}

	getAll() {
		return this.observable.getAll();
	}

	get(pid: string) {
		return this.observable.get(pid);
	}

	subscribe: ObservableService<RenderedProgramManifest>['subscribe'] = (
		type,
		observer
	) => {
		return this.observable.subscribe(type, observer);
	};
}

function toExecutedProgramManifest(
	manifest: ProgramManifest
): RenderedProgramManifest {
	return {
		...manifest,
		pid: `pid-${uniqueId++}`
	};
}
