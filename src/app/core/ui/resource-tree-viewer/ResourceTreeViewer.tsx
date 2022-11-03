import {
	ResourceDefinition,
	ResourcePath
} from '@system/definitions/resource.definition';
import { FC } from 'react';
import { useResourcesInPath } from '@ui/resource-tree-viewer/useResourcesInPath';
import { ResourceItem } from '@ui/resource-tree-viewer/ResourceItem';
import { Grid, GridCol } from '@ui/core/grid/Grid';

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
		<Grid>
			{resources.map((it) => (
				<GridCol key={it.rid || it.name} span="content">
					<ResourceItem
						name={it.name}
						type={it.type}
						onClick={() => onClick(it)}
					/>
				</GridCol>
			))}
		</Grid>
	);
};
