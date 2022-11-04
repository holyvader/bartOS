import {
	ResourceDefinition,
	ResourcePath,
	ResourceType
} from '@system/definitions/resource.definition';
import { FC, useState } from 'react';
import { HOME_PATH } from '@system/utils/resources/path/homePath';
import { Breadcrumb } from '@programs/file-manager/breadcrumb/Breadcrumb';
import { FullHeightStickyTop } from '@ui/layouts/FullHeightStickyTop';
import { FolderPreview } from '@ui/resource-tree/FolderPreview';
import { isFolder } from '@system/utils/resources/type/isFolder';
import { getFolderPath } from '@system/utils/resources/path/getFolderPath';

interface ResourceTreeBrowserProps {
	path?: ResourcePath;
	filterByType?: ResourceType;
	onClick(resource: ResourceDefinition): void;
}

export const ResourceTreeBrowser: FC<ResourceTreeBrowserProps> = ({
	path = HOME_PATH,
	filterByType,
	onClick
}) => {
	const [currentPath, setCurrentPath] = useState<ResourcePath>(path);

	const handleClick = (resource: ResourceDefinition) => {
		if (isFolder(resource)) {
			setCurrentPath(getFolderPath(resource));
		} else {
			onClick(resource);
		}
	};

	return (
		<FullHeightStickyTop
			topHeight={42}
			top={<Breadcrumb path={currentPath} onSetPath={setCurrentPath} />}>
			{/* ResourceTreeViewer should verify user permissions */}
			<FolderPreview
				path={currentPath}
				onClick={handleClick}
				filterByType={filterByType}
			/>
		</FullHeightStickyTop>
	);
};
