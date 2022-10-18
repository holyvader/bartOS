import {
	InjectableServiceManifest,
	InjectableServiceName
} from '@system/definitions/injectable-service-manifest.definition';
import { ObservableService } from '@system/data/observable/observable.service';
import { InjectableServiceImpl } from '@system/definitions/injectable-service.definition';

export class InjectableServiceRegistry {
	private observable = new ObservableService<InjectableServiceManifest>('id');

	register(manifests: InjectableServiceManifest[]) {
		this.observable.add(manifests);
		return this;
	}

	getAll(): IterableIterator<InjectableServiceManifest> {
		return this.observable.getAll();
	}

	get(name: InjectableServiceName) {
		return this.observable.get(name);
	}
	subscribe: ObservableService<InjectableServiceManifest>['subscribe'] = (
		type,
		observer
	): (() => void) => {
		return this.observable.subscribe(type, observer);
	};
}
