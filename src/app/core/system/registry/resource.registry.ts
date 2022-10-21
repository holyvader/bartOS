import { ResourceDefinition } from '@system/definitions/resource.definition';
import { ObservableService } from '@system/data/observable/observable.service';

export class ResourceRegistry {
	private observable = new ObservableService<ResourceDefinition>('id');

	register(manifests: ResourceDefinition[]) {
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

	subscribe: ObservableService<ResourceDefinition>['subscribe'] = (
		type,
		observer
	) => {
		return this.observable.subscribe(type, observer);
	};
}
