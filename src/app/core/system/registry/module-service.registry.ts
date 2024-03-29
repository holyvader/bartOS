import {
	ModuleServiceManifest,
	ModuleServiceName
} from '@system/definitions/module-service-manifest.definition';
import { ObservableService } from '@system/data/observable/observable.service';

export class ModuleServiceRegistry {
	private observable = new ObservableService<ModuleServiceManifest>('id');

	register(manifests: ModuleServiceManifest[]) {
		this.observable.add(manifests);
		return this;
	}

	getAll() {
		return this.observable.getAll();
	}

	get(name: ModuleServiceName) {
		return this.observable.get(name);
	}

	removeAll() {
		this.observable.removeAll();
	}

	subscribe: ObservableService<ModuleServiceManifest>['subscribe'] = (
		type,
		observer
	): (() => void) => {
		return this.observable.subscribe(type, observer);
	};
}
