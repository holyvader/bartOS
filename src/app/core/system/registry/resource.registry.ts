import {
	ResourceDefinition,
	RID
} from '@system/definitions/resource.definition';
import { ObservableService } from '@system/data/observable/observable.service';

export class ResourceRegistry {
	private observable = new ObservableService<ResourceDefinition>('rid');

	register(manifests: ResourceDefinition[]) {
		this.add(manifests);
		return this;
	}

	add(resources: ResourceDefinition[]) {
		this.observable.add(resources);
		return this;
	}

	remove(rid: RID[]) {
		this.observable.remove(rid);
		return this;
	}

	getAll() {
		return this.observable.getAll();
	}

	get(rid: RID) {
		return this.observable.get(rid);
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
