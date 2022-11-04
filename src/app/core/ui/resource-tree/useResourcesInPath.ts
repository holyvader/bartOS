import {
	ResourceDefinition,
	ResourcePath,
	ResourceType
} from '@system/definitions/resource.definition';
import { system } from '@system/system';
import { SystemServiceName } from '@system/definitions/system-service.definition';
import { useEffect, useState } from 'react';
import { filterNotEmpty } from '@system/data/collection/filter-not-empty';
import { isFolder } from '@system/utils/resources/type/isFolder';

export function useResourcesInPath(
	path: ResourcePath,
	filterByType?: ResourceType
) {
	const [resources, setResources] = useState<ResourceDefinition[]>([]);
	const resourceManager = system.systemServiceManager.getService(
		SystemServiceName.RESOURCE_MANAGER
	);

	useEffect(() => {
		setResources(
			splitResourcesByFolders(path, resourceManager?.getAll() ?? [])
				.sort(sortByTypeAndName)
				.filter((it) => byType(it, filterByType))
		);
		const unsubscribeAdd = resourceManager?.subscribe('add', (newResources) => {
			setResources((prevResources) =>
				splitResourcesByFolders(path, prevResources.concat(newResources))
					.sort(sortByTypeAndName)
					.filter((it) => byType(it, filterByType))
			);
		});
		const unsubscribeRemove = resourceManager?.subscribe(
			'remove',
			(removedResources) => {
				const toRemove = removedResources.map((it) => it.rid);
				setResources((prevResources) => [
					...prevResources.filter((it) => !toRemove.includes(it.rid))
				]);
			}
		);

		return () => {
			unsubscribeAdd?.();
			unsubscribeRemove?.();
		};
	}, [path]);

	return resources;
}

function splitResourcesByFolders(
	path: ResourcePath,
	resources: ResourceDefinition[]
): ResourceDefinition[] {
	const dirNames: string[] = [];
	const result: ResourceDefinition[] = resources
		.filter((it) => {
			return it.path.includes(path);
		})
		.map((it) => {
			if (it.path === path) {
				return it;
			}
			return {
				type: 'dir',
				path,
				name: filterNotEmpty(it.path.substring(path.length).split('/'), {
					removeEmptyStrings: true
				})[0]
			} as ResourceDefinition;
		})
		.filter((it) => {
			if (it.type !== 'dir') {
				return true;
			}
			if (!dirNames.includes(it.name)) {
				dirNames.push(it.name);
				return true;
			}
			return false;
		});
	return result;
}

function sortByTypeAndName(a: ResourceDefinition, b: ResourceDefinition) {
	if ((isFolder(a) && isFolder(b)) || (!isFolder(a) && !isFolder(b))) {
		return a.name.localeCompare(b.name);
	}
	if (isFolder(a)) {
		return -1;
	}
	return 1;
}

function byType(resource: ResourceDefinition, type?: ResourceType) {
	if (!type || isFolder(resource)) {
		return true;
	}
	return resource?.type === type;
}
