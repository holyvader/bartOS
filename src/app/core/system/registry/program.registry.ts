import { ProgramManifest } from '@system/definitions/program-manifest.definition';
import { ObservableService } from '@system/data/observable/observable.service';

export class ProgramRegistry {
	private observable = new ObservableService<ProgramManifest>('id');

	register(manifests: ProgramManifest[]) {
		this.observable.add(manifests);
		return this;
	}

	getAll() {
		return this.observable.getAll();
	}
	get(id: string) {
		return this.observable.get(id);
	}

	removeAll() {
		this.observable.removeAll();
	}

	subscribe: ObservableService<ProgramManifest>['subscribe'] = (
		type,
		observer
	) => {
		return this.observable.subscribe(type, observer);
	};
}
