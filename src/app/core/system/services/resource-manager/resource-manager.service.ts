import { ResourceRegistry } from '@system/registry/resource.registry';
import {
	ResourceDefinition,
	ResourcePath,
	RID
} from '@system/definitions/resource.definition';

export class ResourceManagerService {
	constructor(private resourceRegistry: ResourceRegistry) {}

	add(resources: ResourceDefinition[]) {
		this.resourceRegistry.add(resources);
		return this;
	}

	getAll() {
		return this.resourceRegistry.getAll();
	}

	get(rid: RID) {
		return this.resourceRegistry.get(rid);
	}

	getAllInPath(path: ResourcePath) {
		return this.getAll().filter((it) => it.path === path);
	}

	remove(rid: RID) {
		this.resourceRegistry.remove(
			this.getAll()
				.filter((it) => it.rid === rid)
				.map((it) => it.rid)
		);
	}

	removeAll() {
		this.resourceRegistry.removeAll();
	}

	subscribe: ResourceRegistry['subscribe'] = (type, observer) => {
		return this.resourceRegistry.subscribe(type, observer);
	};
}
