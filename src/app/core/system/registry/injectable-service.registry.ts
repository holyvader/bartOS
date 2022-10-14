import {
	InjectableServiceManifest,
	InjectableServiceName
} from '@system/definitions/injectable-service-manifest.definition';
import { ObservableService } from '@system/data/observable/observable.service';

export class InjectableServiceRegistry {
	private observable = new ObservableService<InjectableServiceManifest>('id');

	register(manifests: InjectableServiceManifest[]) {
		this.observable.from(manifests);
		return this;
	}

	getAll() {
		return this.observable.getAll();
	}

	get(name: InjectableServiceName) {
		return this.observable.get(name);
	}

	subscribe: ObservableService<InjectableServiceManifest>['subscribe'] = (
		type,
		observer
	) => {
		return this.observable.subscribe(type, observer);
	};
}
