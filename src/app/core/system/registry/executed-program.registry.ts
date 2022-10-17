import {
	ProgramManifest,
	RenderedProgramManifest
} from '@system/definitions/program-manifest.definition';
import { ObservableService } from '@system/data/observable/observable.service';
import { InjectableServiceImpl } from '@system/definitions/injectable-service.definition';

let uniqueId = 1;

export class ExecutedProgramRegistry {
	private observable = new ObservableService<RenderedProgramManifest<InjectableServiceImpl[]>>('pid');

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

	subscribe: ObservableService<RenderedProgramManifest<InjectableServiceImpl[]>>['subscribe'] = (
		type,
		observer
	) => {
		return this.observable.subscribe(type, observer);
	};
}

function toExecutedProgramManifest(
	manifest: ProgramManifest
): RenderedProgramManifest<InjectableServiceImpl[]> {
	return {
		...manifest,
		pid: `pid-${uniqueId++}`
	};
}
