import {
	ResourceDefinition,
	ResourcePath
} from '@system/definitions/resource.definition';
import { system } from '@system/system';
import { SystemServiceName } from '@system/definitions/system-service.definition';
import { useEffect, useState } from 'react';

export function useResourcesInPath(path: ResourcePath) {
	const [resources, setResources] = useState<ResourceDefinition[]>([]);
	const resourceManager = system.systemServiceManager.getService(
		SystemServiceName.RESOURCE_MANAGER
	);

	useEffect(() => {
		setResources(
			resourceManager?.getAll().filter((it) => it.path === path) ?? []
		);
		const unsubscribeAdd = resourceManager?.subscribe('add', (newResources) => {
			setResources((prevResources) => prevResources.concat(newResources));
		});

		return () => {
			unsubscribeAdd?.();
		};
	}, [path]);

	return resources;
}
