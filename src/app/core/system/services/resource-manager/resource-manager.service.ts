import { ResourceRegistry } from '@system/registry/resource.registry';

export class ResourceManagerService {
	constructor(private programsToRender: ResourceRegistry) {
	}

	subscribe: ResourceRegistry['subscribe'] = (type, observer) => {
		return this.programsToRender.subscribe(type, observer);
	};
}
