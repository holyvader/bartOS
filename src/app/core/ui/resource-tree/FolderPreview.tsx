import {
	ResourceDefinition,
	ResourcePath,
	ResourceType
} from '@system/definitions/resource.definition';
import { FC } from 'react';
import { useResourcesInPath } from '@ui/resource-tree/useResourcesInPath';
import { ResourceItem } from '@ui/resource-tree/ResourceItem';
import { Grid, GridCol } from '@ui/core/grid/Grid';

interface FolderPreviewProps {
	path: ResourcePath;
	filterByType?: ResourceType;
	onClick(resource: ResourceDefinition): void;
}

export const FolderPreview: FC<FolderPreviewProps> = ({
	path,
	onClick,
	filterByType
}) => {
	const resources = useResourcesInPath(path, filterByType);
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
