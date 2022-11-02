import { ResourcePath } from '@system/definitions/resource.definition';
import { FC } from 'react';
import { useResourcesInPath } from '@ui/resource-tree-viewer/useResourcesInPath';
import { ResourceItem } from '@ui/resource-tree-viewer/ResourceItem';

interface ResourceTreeViewerProps {
	path: ResourcePath;
}

export const ResourceTreeViewer: FC<ResourceTreeViewerProps> = ({ path }) => {
	const resources = useResourcesInPath(path);
	return (
		<div>
			{resources.map((it) => (
				<ResourceItem key={it.rid} name={it.name} type={it.type} />
			))}
		</div>
	);
};
