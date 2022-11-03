import {
	ResourceDefinition,
	ResourcePath
} from '@system/definitions/resource.definition';
import { FC } from 'react';
import { useResourcesInPath } from '@ui/resource-tree-viewer/useResourcesInPath';
import { ResourceItem } from '@ui/resource-tree-viewer/ResourceItem';

interface ResourceTreeViewerProps {
	path: ResourcePath;
	onClick(resource: ResourceDefinition): void;
}

export const ResourceTreeViewer: FC<ResourceTreeViewerProps> = ({
	path,
	onClick
}) => {
	const resources = useResourcesInPath(path);
	return (
		<div>
			{resources.map((it) => (
				<ResourceItem
					key={it.rid || it.name}
					name={it.name}
					type={it.type}
					onClick={() => onClick(it)}
				/>
			))}
		</div>
	);
};
